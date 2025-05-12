import sys
from Bio.Align import substitution_matrices
import re
import os
import json

def read_alignment_file(filename):
    with open(filename, "r") as file:
        lines = file.readlines()
    sequences = {}
    
    for line in lines:
        if not line.strip():
            continue
        parts = line.strip().split()
        if len(parts) < 2:
            continue
        seq_id, seq = parts[0], parts[1]
        if seq_id not in sequences:
            sequences[seq_id] = ""
        sequences[seq_id] += seq
    
    return list(sequences.items())

def process_pairwise_alignment(seq1, seq2):
    seq1_id, seq1_seq = seq1
    seq2_id, seq2_seq = seq2
    
    new_seq1, new_seq2 = "", ""
    matches, insertions, deletions, mismatches, total = 0, 0, 0, 0, 0
    match_line = ""
    
    for i in range(len(seq1_seq)):
        if seq1_seq[i] == "-" and seq2_seq[i] == "-":
            continue
        new_seq1 += seq1_seq[i]
        new_seq2 += seq2_seq[i]
    
    seq1_seq, seq2_seq = new_seq1.upper(), new_seq2.upper()
    
    for i in range(len(seq1_seq)):
        if seq1_seq[i] == seq2_seq[i]:
            matches += 1
            match_line += "*"
        elif seq1_seq[i] == "-" or seq2_seq[i] == "-":
            match_line += " "
            if seq1_seq[i] == "-":
                insertions += 1
            else:
                deletions += 1
        else:
            mismatches += 1
            match_line += ":"
        total += 1
    
    identity = (matches / total) * 100 if total else 0
    matrix = substitution_matrices.load("BLOSUM62")
    score = sum(matrix.get((a, b), -12 if a == "-" or b == "-" else -1) for a, b in zip(seq1_seq, seq2_seq))
    
    return seq1_id, seq1_seq, seq2_id, seq2_seq, match_line, matches, insertions, deletions, mismatches, identity, score, total

def format_output(results, output_file):
    with open(output_file, "w") as out:
        out.write("Alignment generated on the basis of profile\n")
        
        total_sequences = sum(r[11] for r in results)
        total_matches = sum(r[5] for r in results)
        total_insertions = sum(r[6] for r in results)
        total_deletions = sum(r[7] for r in results)
        total_mismatches = sum(r[8] for r in results)
        avg_identity = sum(r[9] for r in results) / len(results) if results else 0
        total_score = sum(r[10] for r in results)

        out.write(f"Total Sequences: {total_sequences}\n")
        out.write(f"Matched: {total_matches}\n")
        out.write(f"Mismatches: {total_mismatches}\n")
        out.write(f"Insertions: {total_insertions}\n")
        out.write(f"Deletions: {total_deletions}\n")
        out.write(f"Identity: {avg_identity:.2f}%\n")
        out.write(f"Score: {total_score}\n\n")

        for res in results:
            seq1_id, seq1_seq, seq2_id, seq2_seq, match_line = res[:5]
            max_id_width = max(len(seq1_id), len(seq2_id))
            spacing = 4
            prefix_width = max_id_width + spacing
            match_prefix_space = " " * prefix_width

            for i in range(0, len(seq1_seq), 50):
                out.write(f"{seq1_id.ljust(prefix_width)}{seq1_seq[i:i+50]}\n")
                out.write(f"{seq2_id.ljust(prefix_width)}{seq2_seq[i:i+50]}\n")
                out.write(f"{match_prefix_space}{match_line[i:i+50]}\n\n")

def main():
    if len(sys.argv) != 3:
        print("Usage: python format.py <input_file> <output_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        sys.exit(1)

    sequences = read_alignment_file(input_file)
    results = []

    for i in range(0, len(sequences), 2):
        if i + 1 < len(sequences):
            results.append(process_pairwise_alignment(sequences[i], sequences[i+1]))

    format_output(results, output_file)
    print(f"Formatted alignment saved to {output_file}")

if __name__ == "__main__":
    main()

