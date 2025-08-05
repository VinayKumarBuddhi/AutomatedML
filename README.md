# 🤖 AutoML Lite

> **Intelligent Machine Learning Made Simple**  
> A powerful yet user-friendly automated machine learning platform that combines natural language queries with advanced ML capabilities.

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org)
[![Flask](https://img.shields.io/badge/Flask-2.0+-000000.svg)](https://flask.palletsprojects.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 🎯 **Natural Language Interface**
- Ask questions about your data in plain English
- Get instant insights with AI-powered query processing
- No coding required for data exploration

### 🤖 **Automated Machine Learning**
- **Classification & Regression** support
- **Auto Model Selection** with cross-validation
- **Hyperparameter Optimization** using RandomizedSearchCV
- **Multiple Algorithms**: Random Forest, SVM, Logistic/Linear Regression

### 📊 **Interactive Data Analysis**
- **Real-time Data Preview** with beautiful tables
- **Column Information** display
- **Statistical Insights** on demand
- **Model Performance Metrics**

### 🎨 **Modern Web Interface**
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** and transitions
- **User Authentication** with Firebase
- **Real-time Updates** and progress indicators

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google API Key (for Gemini AI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VinayKumarBuddhi/AutomatedML.git
   cd AutomatedML
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   ```bash
   # Create .env file in backend directory
   echo "GOOGLE_API_KEY=your_google_api_key_here" > backend/.env
   ```

5. **Start the Application**
   ```bash
   # Terminal 1: Start Backend
   cd backend
   python app.py
   
   # Terminal 2: Start Frontend
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

---

## 📖 Usage Guide

### 1. **Upload Your Dataset**
- Click "Upload Dataset" 
- Select your CSV file
- Preview your data instantly

### 2. **Query Your Data**
- Ask questions like:
  - "Show me the first 5 rows"
  - "What are the column names?"
  - "Calculate the average age"
  - "Find the correlation between features"

### 3. **Train Machine Learning Models**
- Select your task type (Classification/Regression)
- Click "Train Model"
- View performance metrics and download the best model

### 4. **Download Trained Models**
- Access your trained models
- Download for deployment
- Track model performance

---

## 🛠️ Technology Stack

### Backend
- **Flask** - Web framework
- **Pandas** - Data manipulation
- **Scikit-learn** - Machine learning
- **Google Gemini AI** - Natural language processing
- **LangChain** - AI integration

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Firebase** - Authentication

### AI/ML
- **Random Forest** - Ensemble learning
- **SVM** - Support Vector Machines
- **Logistic/Linear Regression** - Statistical modeling
- **Cross-validation** - Model evaluation

---

## 📁 Project Structure

```
AutoML-Lite/
├── backend/
│   ├── app.py                 # Flask server
│   ├── llm_chain.py          # AI integration
│   ├── ml_pipeline/
│   │   └── model_selection.py # AutoML logic
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   └── App.jsx           # Main app
│   └── package.json          # Node dependencies
└── README.md
```

---

## 🔧 Configuration

### Environment Variables
```bash
# Backend (.env)
GOOGLE_API_KEY=your_google_api_key_here
```

### API Endpoints
- `POST /upload` - Upload dataset
- `POST /run_automl` - Train models
- `POST /query_dataset` - Query data
- `GET /download/<filename>` - Download models

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for natural language processing
- **Scikit-learn** for machine learning algorithms
- **React & Tailwind** for the beautiful UI
- **Flask** for the robust backend

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/VinayKumarBuddhi/AutomatedML/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

<div align="center">

**Made with ❤️ by the AutoML Lite Team**

[![GitHub stars](https://img.shields.io/github/stars/VinayKumarBuddhi/AutomatedML?style=social)](https://github.com/VinayKumarBuddhi/AutomatedML)
[![GitHub forks](https://img.shields.io/github/forks/VinayKumarBuddhi/AutomatedML?style=social)](https://github.com/VinayKumarBuddhi/AutomatedML)

</div>