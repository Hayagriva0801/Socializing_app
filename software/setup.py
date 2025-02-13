from setuptools import setup, find_packages

# Read dependencies from requirements.txt
def read_requirements():
    with open("requirements.txt") as f:
        return f.read().splitlines()

setup(
    name="socializing_app",
    version="0.1",
    packages=find_packages(),
    install_requires=read_requirements(),
    include_package_data=True,
    entry_points={
        "console_scripts": [
            "socializing_app=app:app.run"
        ]
    },
)
