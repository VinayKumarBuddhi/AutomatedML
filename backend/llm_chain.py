import os
import pandas as pd
from dotenv import load_dotenv
import google.generativeai as genai
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain_core.runnables import RunnableSequence
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
genai.configure(api_key=GOOGLE_API_KEY) 
# for model in genai.list_models():
#     print(model.name)
def generate_pandas_code(query, df):
    try:
        print(f"⏳ Received query: {query}")
        
        # Ensure DataFrame is loaded and columns are available
        if df.empty:
            print("❌ Error: DataFrame is empty or not loaded.")
            return None

        # List columns properly
        columns = ", ".join(f"{col} ({dtype})" for col, dtype in zip(df.columns, df.dtypes))
        print(f"📊 Columns info: {columns}")

        # Template with dynamic columns info
        prompt_template = """
You are a coding assistant that translates a user's question into runnable Python pandas code.
You must operate ONLY on the provided dataframe `df` which has columns: {columns}

Return ONLY Python code (no backticks, no prose). Follow these rules strictly:
- Do NOT import libraries, read/write files, access network, or use plotting/display functions.
- Use pandas operations on `df` only. Assume `df` is already loaded.
- The final answer MUST be assigned to a variable named `result`.
- `result` MUST be one of: pandas.DataFrame, pandas.Series, pandas.Index, list, dict, int, float, str, or bool.
- Do NOT print. Do NOT return from functions. Do NOT define functions. Just straight-line code.
- Prefer DataFrame outputs for tabular answers (e.g., use reset_index() after groupby to return a table).
- Use the exact column names shown above.

User question: {query}
Python code only:
""".strip()

        # Generate the code using Gemini
        prompt = PromptTemplate(template=prompt_template, input_variables=["columns", "query"])
        llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", temperature=0)
        chain: RunnableSequence = prompt | llm

        response = chain.invoke({"columns": columns, "query": query})
        print("✅ Gemini raw response:", response)

        if hasattr(response, "content"):
            print(response.content.strip())
            return response.content.strip()
        elif isinstance(response, str):
            print(response.strip())
            return response.strip()
        else:
            print("⚠️ Unexpected response type:", type(response))
            return None

    except Exception as e:
        import traceback
        print("❌ Full Exception:")
        traceback.print_exc()
        return None
