//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.8;

contract Inventario {
        struct Deposito {
                address depositante;
                uint256 valor;
                uint256 data;
        }

        uint256 public dataDeRetirada;
        address public herdeiro;

        Deposito[] public depositos;

        constructor(address _herdeiro) public {
                herdeiro = _herdeiro;
                dataDeRetirada = block.timestamp + 120;
        }

        function adicionarFundos() public payable {
                require(msg.value > 0, "deposito nao pode ser vazio");

                Deposito memory deposito = Deposito(
                        msg.sender,
                        msg.value,
                        block.timestamp
                );
                depositos.push(deposito);
        }

        function saque(uint256 valor) public {
                require(msg.sender == herdeiro, "vc nao eh o herdeiro");
                require(block.timestamp > dataDeRetirada, "nao chegou a hora!");
                require(
                        valor < address(this).balance,
                        "vc esta pedindo mais do que disponivel"
                );

                msg.sender.transfer(valor);
        }

        function checarBalanco() public view returns (uint256) {
                return address(this).balance;
        }
}
