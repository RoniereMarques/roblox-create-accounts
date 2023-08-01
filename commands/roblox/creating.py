import time
import os
import subprocess
import pyautogui
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys
import random

def calculate_birth_year(user_id):
    # Obter os primeiros dois dígitos do ID como um número inteiro
    first_two_digits = int(user_id[:2])

    # Calcular o ano de nascimento usando os dois dígitos iniciais do ID
    birth_year = 2023 - first_two_digits

    # Garantir que o ano de nascimento esteja dentro do intervalo de 2023 a 1924
    birth_year = max(1924, min(2023, birth_year))

    return str(birth_year)

def generate_random_month():
    # Lista com os nomes dos meses com a primeira letra maiúscula
    months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    # Escolhe um mês aleatoriamente da lista
    return random.choice(months)

def generate_random_day():
    return random.randint(1, 31)

def fill_roblox_form():
    # Configuração do WebDriver do Chrome
    driver = webdriver.Chrome()

    try:
        # Abrir o site do Roblox
        driver.get("https://www.roblox.com")

        # Ler o nome de usuário, a senha e o ID do usuário da entrada padrão (stdin)
        username = input().strip()
        password = input().strip()
        userID = input().strip()

        # Extrai os primeiros 4 dígitos do ID como a data de nascimento
        birth_date = userID[:4]

        # Calcula o ano de nascimento com base no ID do usuário
        birth_year = calculate_birth_year(userID)

        # Encontra e preenche os campos de data de nascimento
        birth_month_field = driver.find_element(By.ID, "MonthDropdown")
        birth_day_field = driver.find_element(By.ID, "DayDropdown")
        birth_year_field = driver.find_element(By.ID, "YearDropdown")

        # Define a data de nascimento usando os primeiros 4 dígitos do ID
        birth_month_field.send_keys(generate_random_month()[:3])  # Apenas a primeira letra em maiúscula
        birth_day_field.click()  # Clica no campo para abrir a lista de opções
        birth_day = generate_random_day()
        birth_day_field.send_keys(str(birth_day))  # Define o dia aleatório gerado

        # Define o ano de nascimento com base no cálculo
        birth_year_field.send_keys(birth_year)

        # Encontrar e preencher os campos de nome de usuário e senha
        user_field = driver.find_element(By.ID, "signup-username")
        password_field = driver.find_element(By.ID, "signup-password")
        user_field.send_keys(username)
        password_field.send_keys(password)

        # Encontrar e clicar no botão de cadastro pelo ID
        signup_button = driver.find_element(By.ID, "signup-button")
        signup_button.click()

        # Aguardar um curto período de tempo para verificar se ocorreu algum erro
        time.sleep(2)

        # Verificar se o cadastro foi bem-sucedido ou se ocorreu algum erro
        if "https://web.roblox.com/home?nu=true" in driver.current_url:
            message = "✅ Conta no Roblox criada com sucesso!"
        else:
            message = "❌ Ocorreu um erro durante a criação da conta no Roblox."

    except Exception as e:
        print("Erro:", e)
        message = "❌ Ocorreu um erro inesperado durante o processo."

    finally:
        # Fechar o navegador
        driver.quit()
        return message

if __name__ == "__main__":
    response_message = fill_roblox_form()
    print(response_message)
