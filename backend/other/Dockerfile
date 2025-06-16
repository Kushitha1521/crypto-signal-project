FROM python:3.9

# Create non-root user
RUN useradd -m -u 1000 user
USER user

# Setup environment
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

# Install dependencies
COPY --chown=user ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt gunicorn

# Copy app code
COPY --chown=user . /app

# Run using gunicorn (not uvicorn)
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "app:app"]
