# HardwareAccess

O app tem como objetivo a comunicação com dispositivo BLE para possibilitar que luzes de LED sejam acionadas remotamente. Utilizou-se um arduino UNO e um módulo BLE HC-08 para testes.

O aplicativo, nomeado Lights On é composto de duas telas. A primeira corresponde à tela de login, aonde devem ser informados dados para os campos e-mail e senha e uma segunda tela (tela principal), aonde é possível realizar ligar e desligar o LED pressionando-se o botão turn on/off.

Cabe dizer que, assim que realizado o login, a varredura pelo BLE informado, conexão e descobrimento de suas características ocorrem de forma automática. Implementado apenas o botão de ligar/desligar para apenas um LED haja vista que se dispunha de apenas um arduino e módulo BLE.


Exemplo de funcionamento de tela principal:
<img src = https://media.giphy.com/media/hiLtHAo2ItAnw9k0tH/giphy.gif>
