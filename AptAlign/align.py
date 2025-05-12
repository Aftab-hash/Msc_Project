#!/usr/bin/env python3
import os
import sys
import json
from Bio.Align import PairwiseAligner
from Bio.Align import substitution_matrices


def align_sequences(seq1, seq2, blosum_matrix, gap_open, gap_extend):
    """Perform global sequence alignment using PairwiseAligner."""
    aligner = PairwiseAligner()
    aligner.substitution_matrix = blosum_matrix
    aligner.open_gap_score = gap_open
    aligner.extend_gap_score = gap_extend
    alignments = aligner.align(seq1, seq2)
    return alignments[0] if alignments else None


def calculate_cumulative_identity(align_seq1, align_seq2):
    """Calculate sequence identity percentage."""
    total_matches = sum(1 for a1, a2 in zip(align_seq1, align_seq2) if a1 == a2)
    total_positions = len(align_seq1)
    return total_matches, total_positions, (total_matches / total_positions) * 100 if total_positions > 0 else 0


def choose_blosum_matrix(identity):
    """Choose an optimized BLOSUM matrix based on sequence identity."""
    if identity < 30:
        return substitution_matrices.load("BLOSUM30"), -12, -2, "BLOSUM30"
    elif identity >= 80:
        return substitution_matrices.load("BLOSUM80"), -12, -2, "BLOSUM80"
    elif identity >= 70:
        return substitution_matrices.load("BLOSUM62"), -12, -2, "BLOSUM62"
    elif identity >= 50:
        return substitution_matrices.load("BLOSUM50"), -12, -2, "BLOSUM50"
    elif identity >= 40:
        return substitution_matrices.load("BLOSUM45"), -12, -5, "BLOSUM45"
    return substitution_matrices.load("BLOSUM30"), -12, -5, "BLOSUM30"


def format_alignment(align_seq1, align_seq2, query_id="query", target_id="target", line_width=60):
    """Format the alignment output for better readability."""
    output = []
    match_line = ""

    for a1, a2 in zip(align_seq1, align_seq2):
        if a1 == a2:
            match_line += "*"
        elif a1 == "-" or a2 == "-":
            match_line += " "
        else:
            match_line += ":"

    for i in range(0, len(align_seq1), line_width):
        output.append(f"{query_id:<10} {align_seq1[i:i+line_width]}")
        output.append(f"{'':<10} {match_line[i:i+line_width]}")
        output.append(f"{target_id:<10} {align_seq2[i:i+line_width]}")
        output.append("")

    return "\n".join(output)


def save_alignment_results(file_path, matrix_name, gap_open, gap_extend, cumulative_identity, score, total_matches, total_positions, align_seq1, align_seq2, seq_id1, seq_id2):
    """Save alignment results to a file."""
    try:
        with open(file_path, 'w') as file:
            file.write(f"Matrix Used: {matrix_name}\n")
            file.write(f"Gap Open Penalty: {gap_open}\n")
            file.write(f"Gap Extend Penalty: {gap_extend}\n")
            file.write(f"Cumulative Identity: {cumulative_identity:.2f}%\n")
            file.write(f"Alignment Score: {score}\n")
            file.write(f"Total Matches: {total_matches}\n")
            file.write(f"Total Positions: {total_positions}\n\n")
            file.write(format_alignment(align_seq1, align_seq2, seq_id1, seq_id2))
            # Ensure the file is readable and writable by everyone
            os.chmod(file_path, 0o666)
            print(f"Alignment file successfully saved: {file_path}")
    except Exception as e:
        print(f"Error writing alignment file: {str(e)}", file=sys.stderr)
        raise


def save_suggested_params(output_dir, matrix_name, gap_open, gap_extend):
    """Save suggested parameters to a JSON file for the web interface."""
    params = {
        "suggested_matrix": matrix_name,
        "suggested_gap_open": gap_open,
        "suggested_gap_extend": gap_extend
    }
    params_file = os.path.join(output_dir, "suggested_params.json")
    with open(params_file, "w") as json_file:
        json.dump(params, json_file)

    # Ensure the file is readable and writable by everyone
    os.chmod(params_file, 0o666)
    print(f"Suggested parameters saved to {params_file} with permissions 666")


def main():
    """Main function to handle sequence alignment workflow."""
    if len(sys.argv) < 7:
        print("Usage: python3 align.py <fasta_id1> <sequence1> <fasta_id2> <sequence2> <output_file1> <output_file2> <mode>")
        sys.exit(1)


    fasta_id1, sequence1 = sys.argv[1], sys.argv[2]
    fasta_id2, sequence2 = sys.argv[3], sys.argv[4]
    output_file1 = sys.argv[5]
    output_file2 = sys.argv[6]
    output_dir   = sys.argv[7]
    mode = sys.argv[8].lower() 
   
    os.makedirs(output_dir, exist_ok=True)  # Creates directory if it doesn't exist
    os.chmod(output_dir, 0o777)  # Set permissions

    if mode == "initial":
        # Perform initial alignment with default parameters
        blosum_matrix1 = substitution_matrices.load("BLOSUM62")
        gap_open1, gap_extend1, matrix_name1 = -12, -2, "BLOSUM62"
        output_file = output_file1  # Use the argument from the command line
        

        
    elif mode == "final":
        if len(sys.argv) < 10:
            print("Error: Missing parameters for final alignment. Provide gap_open, gap_extend, and matrix.", file=sys.stderr)
            sys.exit(1)

        # Get parameters from user input
        gap_open1 = int(sys.argv[9])
        gap_extend1 = int(sys.argv[10])
        matrix_name1 = sys.argv[11]

        try:
            blosum_matrix1 = substitution_matrices.load(matrix_name1)
        except KeyError:
            print(f"Error: Invalid matrix {matrix_name1}.", file=sys.stderr)
            sys.exit(1)
        output_file2 = f"{output_dir}/final_alignment.aln"
        output_file = output_file2


    else:
        print("Error: Invalid mode. Use 'initial' or 'final'.", file=sys.stderr)
        sys.exit(1)

    # Perform alignment
    alignment = align_sequences(sequence1, sequence2, blosum_matrix1, gap_open1, gap_extend1)
    if alignment is None:
        print("Error: No valid alignment found.", file=sys.stderr)
        sys.exit(1)

    # Compute identity
    total_matches, total_positions, identity = calculate_cumulative_identity(alignment[0], alignment[1])


    if mode == "initial":
        # Suggest new parameters based on identity
        blosum_matrix, gap_open, gap_extend, matrix_name = choose_blosum_matrix(identity)
        save_suggested_params(output_dir, matrix_name, gap_open, gap_extend)

    # Save results
    save_alignment_results(output_file, matrix_name1, gap_open1, gap_extend1, identity, alignment.score, total_matches, total_positions, alignment[0], alignment[1], fasta_id1, fasta_id2)

    print(f"Alignment successfully saved to {output_file}")
    if mode == "initial":
        print(f"Suggested matrix: {matrix_name1}, Gap Open: {gap_open1}, Gap Extend: {gap_extend1}")


if __name__ == "__main__":
    main()

