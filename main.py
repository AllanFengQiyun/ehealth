from fastapi import FastAPI
from lifelines import CoxPHFitter

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
