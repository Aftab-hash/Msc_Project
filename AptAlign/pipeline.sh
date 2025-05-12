#!/bin/bash
OUTPUT_DIR="$2"
set -x  # Enable step-by-step tracing
exec > "$OUTPUT_DIR/pipeline.log" 2>&1

# Set the environment variables for T-Coffee
export HOME=/var/www/.tcoffee_tmp
export HOME_4_TCOFFEE=$HOME
export TMP=$HOME
export TEMP=$HOME
export PATH=$PATH:/home/raza/Downloads/T-COFFEE_distribution_Version_13.46.1.b8b01e06/bin/linux

# Debugging: Print the HOME directory to confirm it's set
echo "Using HOME: $HOME"

# Get input and output directories
FASTA_FILE="$1"


mkdir -p "$OUTPUT_DIR"

# Check if the input file exists
if [ ! -f "$FASTA_FILE" ]; then
    echo "Error: Input file not found in $FASTA_FILE"
    exit 1
fi

echo "Input file found: $FASTA_FILE"
ls -l "$FASTA_FILE"
cat "$FASTA_FILE"

# Copy input to output directory
cp "$FASTA_FILE" "$OUTPUT_DIR/seq.fasta"

# Extract first two sequences
awk '
BEGIN { seq_num = 0; filename = "" }
function normalize_id(id) {
    len = length(id)
    if (len < 6) {
        for (i = len + 1; i <= 6; i++) id = id "X"
        return id
    } else {
        return substr(id, 1, 6)
    }
}
/^>/ {
    seq_num++
    if (seq_num == 1) filename = "'"$OUTPUT_DIR"'/seq1.fasta"
    else if (seq_num == 2) filename = "'"$OUTPUT_DIR"'/seq2.fasta"
    split($0, parts, " ")
    orig_id = substr(parts[1], 2)
    new_id = normalize_id(orig_id)
    print ">" new_id > filename
    next
}
seq_num <= 2 { print > filename }
' "$FASTA_FILE"

cat "$OUTPUT_DIR/seq1.fasta"
cat "$OUTPUT_DIR/seq2.fasta"

# Calculate lengths
seq1_length=$(awk '/^>/ {if (NR>1) exit} !/^>/ {total += length($0)} END {print total}' "$OUTPUT_DIR/seq.fasta")
seq2_length=$(awk 'BEGIN {flag=0} /^>/ {if (flag==1) exit} flag {total += length($0)} /^>/ && flag==0 {flag=1} END {print total}' "$OUTPUT_DIR/seq.fasta")
min_length=$((seq1_length - 50))
max_length=$((seq1_length + 50))

seq_ids=($(grep '^>' "$OUTPUT_DIR/seq.fasta" | sed 's/>//'))

# Run PSIBLAST
psiblast -query "$OUTPUT_DIR/seq1.fasta" -db /var/www/html/AptAlign/swissprot1/swissprot -num_iterations 3 -out "$OUTPUT_DIR/results_swissprot1.txt" -outfmt 6
psiblast -query "$OUTPUT_DIR/seq2.fasta" -db /var/www/html/AptAlign/swissprot1/swissprot -num_iterations 3 -out "$OUTPUT_DIR/results_swissprot2.txt" -outfmt 6

# Extract and download sequences
> "$OUTPUT_DIR/pssm.fasta"
for file in "$OUTPUT_DIR/results_swissprot1.txt" "$OUTPUT_DIR/results_swissprot2.txt"; do
    awk -v id1="${seq_ids[0]}" -v id2="${seq_ids[1]}" '
    NR > 1 {
        percent_identity = substr($0, 17, 2) + 0
        id = substr($0, 8, 6)
        if (id == id1 || id == id2) next
        if (percent_identity >= 80) print id, percent_identity
        else if (percent_identity >= 60) print id, percent_identity
        else if (percent_identity >= 40) print id, percent_identity
        else if (percent_identity < 30) print id, percent_identity
    }' "$file" | head -n 70 | while read -r id percent; do
        echo "Downloading: $id ($percent)"
        wget -q -O - "https://rest.uniprot.org/uniprotkb/${id}.fasta" >> "$OUTPUT_DIR/pssm.fasta"
    done
done

# Filter and clean pssm.fasta
awk -v min_len="$min_length" -v max_len="$max_length" '
/^>/ {
    if (seq) {
        if (length(seq) >= min_len && length(seq) <= max_len && !seen[id]) {
            print id; print seq;
            seen[id] = 1;
        }
    }
    id = $0; seq = "";
    next;
}
{ seq = seq $0 }
END {
    if (length(seq) >= min_len && length(seq) <= max_len && !seen[id]) {
        print id; print seq;
    }
}' "$OUTPUT_DIR/pssm.fasta" > "$OUTPUT_DIR/pssm_filtered.fasta"

mv "$OUTPUT_DIR/pssm_filtered.fasta" "$OUTPUT_DIR/pssm.fasta"
awk '/^>/ {if (!seen[$0]++) {print; p=1} else p=0} !/^>/ && p' "$OUTPUT_DIR/pssm.fasta" > "$OUTPUT_DIR/cleaned.fasta"
mv "$OUTPUT_DIR/cleaned.fasta" "$OUTPUT_DIR/pssm.fasta"

# Clean headers
sed -i 's/[@|%]//g' "$OUTPUT_DIR/pssm.fasta"
sed -i -E 's/^(>........).*/\1/' "$OUTPUT_DIR/pssm.fasta"
sed -i 's/[@|%]//g' "$OUTPUT_DIR/seq.fasta"

# Remove original sequences
awk -v id1="${seq_ids[0]}" -v id2="${seq_ids[1]}" '
BEGIN { delete_seq = 0 }
{
    if ($0 ~ "^>") {
        delete_seq = ($0 == ">" id1 || $0 == ">" id2) ? 1 : 0
    }
    if (!delete_seq) print $0
}' "$OUTPUT_DIR/pssm.fasta" > "$OUTPUT_DIR/temp.fasta"
mv "$OUTPUT_DIR/temp.fasta" "$OUTPUT_DIR/pssm.fasta"

# Run T-Coffee for profile alignment (save extras inside OUTPUT_DIR)
t_coffee -seq "$OUTPUT_DIR/pssm.fasta" -outfile "$OUTPUT_DIR/pssm.aln" -run_name "$OUTPUT_DIR/pssm"
# Profile alignment with seq.fasta, outputs in ClustalW format
t_coffee -profile "$OUTPUT_DIR/pssm.aln" -seq "$OUTPUT_DIR/seq.fasta" -output clustalw -outfile "$OUTPUT_DIR/seq.aln" -run_name "$OUTPUT_DIR/seq"

# Extract rows from alignment
id1="${seq_ids[0]#>}"
id2="${seq_ids[1]#>}"

awk -v id1="$id1" -v id2="$id2" '
NF > 1 {
    if ($1 == id1 || $1 == id2) {
        print $0
        count[$1]++
        if (count[id1] == count[id2]) print ""
    }
}' "$OUTPUT_DIR/seq.aln" > "$OUTPUT_DIR/profile_temp.aln"

# Run formatter script
python3 format.py "$OUTPUT_DIR/profile_temp.aln" "$OUTPUT_DIR/Profile.aln"
if [[ $? -eq 0 ]]; then
    echo "Formatting completed. Final alignment saved in $OUTPUT_DIR/Profile.aln"
else
    echo "Error: Formatting script failed"
    exit 1
fi

# Clean up intermediate files
rm -f "$OUTPUT_DIR/results_swissprot1.txt" "$OUTPUT_DIR/results_swissprot2.txt"
rm -f "$OUTPUT_DIR/pssm.clustalw" "$OUTPUT_DIR/pssm.dnd"
rm -f "$OUTPUT_DIR/seq.clustalw" "$OUTPUT_DIR/seq.dnd"
rm -f "$OUTPUT_DIR/seq1.fasta" "$OUTPUT_DIR/seq2.fasta"
rm -f "$OUTPUT_DIR/seq.aln" "$OUTPUT_DIR/seq.fasta"
rm -f "$OUTPUT_DIR/pssm.html" "$OUTPUT_DIR/wrong.file" "$OUTPUT_DIR/pssm.fasta" "$OUTPUT_DIR/pssm.aln"
rm -f "$OUTPUT_DIR/profile_temp.aln"
rm -f "$OUTPUT_DIR/pssm.aln.html"
rm -f "$OUTPUT_DIR/debug_command.txt"
rm -f "$OUTPUT_DIR/log.txt"
echo "Pipeline completed. Output stored in $OUTPUT_DIR"


alignment_file="$output_dir/Profile.aln"
email_file="$output_dir/email.txt"

if [[ -f "$alignment_file" && -f "$email_file" ]]; then
    email=$(cat "$email_file")
    subject="Your Profile Alignment is Ready"
    message="Hello,

Your alignment for job ID $job_id is complete.

View it here:
http://yourdomain.com/view_profile_result.php?job_id=$job_id

Regards,
AptAlign"

    {
        echo "Subject: $subject"
        echo "To: $email"
        echo "From: AptAlign <projectsem4th@gmail.com>"
        echo ""
        echo "$message"
    } | msmtp --debug --from=default -t
fi


