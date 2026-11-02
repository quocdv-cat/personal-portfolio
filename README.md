# Dong Van Quoc — Personal Developer Portfolio

Personal portfolio website of **Dong Van Quoc**, a Software Engineering student at **Electric Power University (EPU)** in Hanoi, Vietnam.

This repository serves as a central hub showcasing software projects, technical skills, academic background, and integrated sub-projects.

---

## 📁 Repository Structure

```text
personal-portfolio-main/
├── index.html                  # Main portfolio page (About, Education, Projects, Skills, Contact)
├── styles.css                  # Responsive design system with CSS variables (Light/Dark mode)
├── script.js                   # Theme toggle, mobile menu, project filter, and scroll-spy logic
├── README.md                   # Project documentation
├── images/
│   ├── PXL_20241108_043628009.jpg  # Profile picture
│   ├── aio-down-preview.svg        # Thumbnail for AIO-down Telegram Bot
│   ├── avg-gpa-preview.svg         # Thumbnail for University GPA & CPA Calculator
│   └── portfolio-preview.svg       # Thumbnail for Personal Portfolio
└── projects/
    ├── project1.html           # Detailed case study: AIO-down Telegram Bot
    ├── project2.html           # Detailed case study: University GPA & CPA Calculator
    ├── project3.html           # Detailed case study: Personal Portfolio Architecture
    ├── AIO-down/               # Integrated Project 1 source code (Python Telegram Bot)
    │   ├── bot.py
    │   ├── requirements.txt
    │   ├── README.md
    │   └── services/
    │       ├── __init__.py
    │       └── tiktok.py
    └── avg_gpa/                # Integrated Project 2 source code (GPA/CPA Web App + Serverless AI)
        ├── index.html
        ├── script.js
        ├── style.css
        ├── README.md
        └── netlify/
            └── functions/
                └── call-gemini.js
```

---

## 🚀 Integrated Projects

### 1. AIO-down — TikTok Media Downloader Telegram Bot
- **Path:** [`./projects/AIO-down`](./projects/AIO-down)
- **Case Study Page:** [`./projects/project1.html`](./projects/project1.html)
- **Telegram Bot:** [@paws_down_tiktok_bot](https://t.me/paws_down_tiktok_bot)
- **GitHub Repository:** [quocdv-cat/AIO-downloader-tele](https://github.com/quocdv-cat/AIO-downloader-tele)
- **Tech Stack:** Python 3, `pyTelegramBotAPI`, `Flask`, `requests`, TikWM & LoveTik APIs.
- **Key Features:** Downloads HD watermark-free TikTok videos, multi-photo slide albums (up to 10 images), and MP3 audio tracks with automatic multi-provider failover and RAM streaming.

### 2. avg_gpa — University GPA & CPA Calculator + AI Advisor
- **Path:** [`./projects/avg_gpa`](./projects/avg_gpa)
- **Case Study Page:** [`./projects/project2.html`](./projects/project2.html)
- **Direct Local Web App:** [`./projects/avg_gpa/index.html`](./projects/avg_gpa/index.html)
- **Live Demo:** [https://avg-gpa.netlify.app/](https://avg-gpa.netlify.app/)
- **GitHub Repository:** [quocdv-cat/avg-gpa](https://github.com/quocdv-cat/avg-gpa)
- **Tech Stack:** HTML5, Tailwind CSS, Vanilla JavaScript (ES6+), SheetJS (`xlsx`), Netlify Serverless Functions, Google Gemini 3.8 Flash API.
- **Key Features:** Supports 30+ Vietnamese university grading scales (EPU, HUST, NEU, VNU, FTU, RMIT...), 3 flexible grade input modes, multi-semester CPA tracking with `localStorage`, Excel (`.xlsx`) import/export, CPA graduation goal calculator, and AI academic feedback.

---

## 🛠️ How to Run Locally

### 1. Running the Portfolio & `avg_gpa` Web App
Because the portfolio and `avg_gpa` frontend are built with standard HTML5, CSS3, and ES6+ JavaScript, you can run them using any local static HTTP server:

```bash
# Option 1: Using Python built-in HTTP server
cd D:\Project\Project\personal-portfolio-main
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.
- Main Portfolio: `http://localhost:8000/index.html`
- Integrated GPA/CPA Calculator: `http://localhost:8000/projects/avg_gpa/index.html`

*(Note: To use the serverless Gemini AI Advisor inside `avg_gpa` locally, run via Netlify CLI with `netlify dev` inside `projects/avg_gpa` and configure `GEMINI_API_KEY` in your environment, or use the live deployment at [avg-gpa.netlify.app](https://avg-gpa.netlify.app/)).*

### 2. Running the `AIO-down` Telegram Bot
```bash
cd D:\Project\Project\personal-portfolio-main\projects\AIO-down
pip install -r requirements.txt

# Set your Telegram Bot Token environment variable
# PowerShell:
$env:BOT_TOKEN="your_telegram_bot_token_here"
python bot.py
```

---

## 📬 Contact
- **Full Name:** Dong Van Quoc
- **Email:** [dongquochn@gmail.com](mailto:dongquochn@gmail.com)
- **GitHub:** [https://github.com/quocdv-cat](https://github.com/quocdv-cat)
- **Location:** Hanoi, Vietnam
