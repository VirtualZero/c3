# C3 (Color Code Converter)
Powered by [Virtualzero](https://virtualzero.net)

A quick and easy solution for converting hexidecimal color codes to RGB or RGB color codes to hexidecimal. C3 is an invaluable tool for web developers or graphic designers.

#### Installation
Clone the repository:
```bash
git clone https://github.com/VirtualZero/c3.git
```

#### Environment

Install Miniconda
```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

```bash
chmod +x Miniconda3-latest-Linux-x86_64.sh
```

```bash
./Miniconda3-latest-Linux-x86_64.sh
```

Create Environment
```bash
conda create --name 'c3' python=3.7
```

Activate Environment
```bash
source activate c3
```

Install Dependencies
```bash
cd c3 && pip install -r requirements.txt
```

#### Execution
It is bad practice to store passwords in applications. For this reason, sensitive information like account passwords, secret keys, and API keys are stored in environment variables. For simplicity, use the included bash script, env.sh, to create the environment variables before executing the application. With the 'c3' virtual environment activated, update env.sh with a secure password and execute the following command:

```bash
chmod +x env.sh && . env.sh
```
To run C3 on your local machine, make sure the 'c3' virtual environment is activated and that you are in the root c3 directory. Enter the following command to start the app:

```bash
python run.py
```

Then, open a browser and go to the following URL:

```bash
http://127.0.0.1:5000
```

To use C3 in a production environment, it is recommended to deploy the app using Gunicorn and Nginx. An example Nginx host file is included, as well as an example systemd service file.
