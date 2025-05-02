<?php
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $banco = "Login_Tela";

    $mysqli = new mysqli($servidor, $usuario, $senha, $banco);

    if ($mysqli->connect_error) {
        die("Erro na conexão: " . $mysqli->connect_error);
    }
?>
