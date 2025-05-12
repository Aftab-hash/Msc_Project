# AptAlign

**AptAlign** is a web-based pipeline designed for Protein sequence alignment and analysis. It provides users with a user-friendly interface for uploading, processing, and visualizing Protein alignment results.

> ⚠️ **Note**: The large SwissProt database files (`swissprot.psq`, `swissprot.phr`, `taxdb.btd`, etc.) have been removed from this repository due to GitHub’s file size limits. Please download them separately if needed for execution.

---

## 🧰 Features

- FASTA file upload for aptamer sequences
- Automatic BLAST database alignment pipeline
- Python + Shell scripts for backend processing
- Web-based frontend using PHP, HTML, CSS, JS
- Organized result visualization (first-pass and re-alignment options)
- Clean file structure for customization or extension

---
## 📂 Project Structure

```text
AptAlign/
├── align.py                  # Python script for primary alignment
├── format.py                 # Sequence formatting functions
├── pipeline.sh               # Orchestrates the alignment steps
├── index.php                 # Upload and main interface
├── process_fasta.php         # Handles uploaded FASTA file
├── realign.php               # Realignment logic
├── view_profile_result.php   # View aligned output
├── header.php                # Header layout include
├── footer.php                # Footer layout include
├── initial_result.php        # Shows initial BLAST alignment results
├── css/                      # Stylesheets
├── js/                       # JavaScript files
├── img/                      # Image assets
├── upload/                   # Uploaded sequences stored temporarily
├── output/                   # Output files from alignment steps
├── headerStyle.css           # Custom UI styling
