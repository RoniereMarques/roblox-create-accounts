# Roblox-Contas

Essa source é um bot no Discord em SlashCommands que cria contas no Roblox usando o Discord.JS v14.

## Funcionalidades

- Cria uma conta no Roblox com nome de usuário e senha fortes.
- Utiliza uma ferramenta de anti-captcha para resolver os desafios de captcha.

## Anti-Captcha

(API ANTI- CAPTCHA)[https://anti-captcha.com/pt/apidoc/task-types/FunCaptchaTask]
Para evitar a necessidade de resolver manualmente os captchas durante o processo de criação de contas no Roblox, você pode utilizar uma ferramenta de anti-captcha. Abaixo, são fornecidos exemplos de códigos em Python e JavaScript para usar o serviço de anti-captcha oficial. Lembre-se de substituir "YOUR_API_KEY_HERE" pelo seu próprio API key fornecido pelo serviço anti-captcha.

### Exemplo de código em Python:

```python
#pip3 install anticaptchaofficial

from anticaptchaofficial.funcaptchaproxyon import *

solver = funcaptchaProxyon()
solver.set_verbose(1)
solver.set_key("YOUR_API_KEY_HERE")
solver.set_website_url("https://website.com")
solver.set_website_key("XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX")

# optional funcaptcha API subdomain, see our Funcaptcha documentation for details
# solver.set_js_api_domain("custom-api-subdomain.arkoselabs.com")

# optional data[blob] value, read the docs
# solver.set_data_blob("{\"blob\":\"DATA_BLOB_VALUE_HERE\"}")

solver.set_proxy_address("PROXY_ADDRESS")
solver.set_proxy_port(1234)
solver.set_proxy_login("proxylogin")
solver.set_proxy_password("proxypassword")
solver.set_user_agent("Mozilla/5.0")

# Specify softId to earn 10% commission with your app.
# Get your softId here: https://anti-captcha.com/clients/tools/devcenter
solver.set_soft_id(0)

token = solver.solve_and_return_solution()
if token != 0:
    print "result token: "+token
else:
    print "task finished with error "+solver.error_code
```

### Observações

   - Lembre-se de seguir as instruções fornecidas pelo serviço de anti-captcha para obter as chaves corretas e configurar o proxy, se necessário.
   - Os exemplos de código acima estão usando a biblioteca oficial "anticaptchaofficial" para Python e JavaScript, mas você pode usar outras bibliotecas e serviços de anti-captcha, se preferir.