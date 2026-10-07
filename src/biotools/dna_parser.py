"""
Bioinformatics Molecular Analysis Toolkit
Developed by Abdullah Amr Maged (AIU & Alexandria University)
"""

from typing import Dict, List, Tuple


def calculate_gc_content(sequence: str) -> float:
    """Calculates GC percentage of a DNA/RNA nucleotide sequence."""
    seq = sequence.upper().strip()
    if not seq:
        return 0.0
    gc_count = seq.count("G") + seq.count("C")
    return round((gc_count / len(seq)) * 100, 2)


def transcribe_dna_to_rna(dna_sequence: str) -> str:
    """Transcribes coding DNA strand to mRNA."""
    return dna_sequence.upper().strip().replace("T", "U")


def reverse_complement(sequence: str) -> str:
    """Generates the reverse complement strand for a nucleotide sequence."""
    complement = {"A": "T", "T": "A", "C": "G", "G": "C", "N": "N"}
    return "".join(complement.get(base, base) for base in reversed(sequence.upper().strip()))


def translate_codon(codon: str) -> str:
    """Translates an RNA codon to its single-letter amino acid code."""
    codon_table = {
        "AUG": "M", "UUU": "F", "UUC": "F", "UUA": "L", "UUG": "L",
        "UCU": "S", "UCC": "S", "UCA": "S", "UCG": "S", "UAU": "Y",
        "UAC": "Y", "UGU": "C", "UGC": "C", "UGG": "W", "CUU": "L",
        "CUC": "L", "CUA": "L", "CUG": "L", "CCU": "P", "CCC": "P",
        "CCA": "P", "CCG": "P", "CAU": "H", "CAC": "H", "CAA": "Q",
        "CAG": "Q", "CGU": "R", "CGC": "R", "CGA": "R", "CGG": "R",
        "AUU": "I", "AUC": "I", "AUA": "I", "ACU": "T", "ACC": "T",
        "ACA": "T", "ACG": "T", "AAU": "N", "AAC": "N", "AAA": "K",
        "AAG": "K", "AGU": "S", "AGC": "S", "AGA": "R", "AGG": "R",
        "GUU": "V", "GUC": "V", "GUA": "V", "GUG": "V", "GCU": "A",
        "GCC": "A", "GCA": "A", "GCG": "A", "GAU": "D", "GAC": "D",
        "GAA": "E", "GAG": "E", "GGU": "G", "GGC": "G", "GGA": "G", "GGG": "G",
        "UAA": "*", "UAG": "*", "UGA": "*"
    }
    return codon_table.get(codon.upper(), "X")


if __name__ == "__main__":
    test_seq = "ATGCGATCGATCGATCGA"
    print(f"Original DNA: {test_seq}")
    print(f"GC Content: {calculate_gc_content(test_seq)}%")
    print(f"Reverse Complement: {reverse_complement(test_seq)}")
