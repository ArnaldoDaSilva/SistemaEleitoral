<?php
include("conexao.php");

if (isset($_POST['email_usuario']) || isset($_POST['senha'])){
    if(strlen($_POST["email_usuario"]) == 0) {
      echo "Preencha o seu Email";
    } else if(strlen($_POST["senha"]) == 0){
      echo "Preencha a senha";
    } else{
       
    $email_usuario =$mysqli->real_escape_string($_POST["email_usuario"]);
    $senha = $mysqli->real_escape_string($_POST["senha"]);

    $query_code = "SELECT * FROM `usuarios` WHERE email_usuario ='email_usuario' AND senha = 'senha'";
    $query = $mysqli->query($query_code) or die("Falha ao Logar: " .mysqli_error($mysqli));

    $quantidade = $query->num_rows;
    if($quantidade == 1){

      $email_usuario = $query->fetch_assoc();

      if(!isset($_SESSION)){
        session_start();
      }
      $_SESSION["id"] = $email_usuario["id"];
      $_SESSION["nome"] = $email_usuario["nome"];

      header("Locaion: Paginas/SistemaVotos.php");

      } else{
        echo"Falha Ao logar: Email ou senha está errada";
      }
}
}
/*
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_usuario = $_POST["email_usuario"];
    $senha = $_POST["senha"];

    $sql = "SELECT * FROM usuarios WHERE email_usuario = '$email_usuario' AND senha = '$senha'";
    $resultado = $conexao->query($sql);

    if ($resultado->num_rows > 0) {
        echo "Login bem-sucedido!";
        // Você pode redirecionar para outra página aqui
    } else {
        echo "Usuário ou senha incorretos.";
    }
}
*/

$mysqli->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="Css/Login.css" class="css">
</head>
<body>
    <div class="login">
        <form action="" method="POST">
            <div id="title">
                <h1>Oficial de Login</h1>
            </div>
         
            <div class="input">
                <!--  <input type="text" autocomplete="on" required> -->  
                  <input type="email" class="input-email" name="email_usuario" autocomplete="on" required>
                  <label for="input">E-mail</label>
              </div>
              <div class="input">
                <!--  <input type="text" autocomplete="on" required> -->  
                  <input type="password" class="input-email" name="senha" autocomplete="on" required>
                  <label for="input">Senha</label>
              </div>

              <div class="checkbox">
                <!--  <input type="text" autocomplete="on" required> -->  
                  <input type="checkbox" class="check">
                  <label for="check">Concordo com os termos e condições</label>
              </div>
              <div class="button">
                <button type="submit" class="btn">Logar</button>
              </div>

              <div class="box"><p>Ou</p></div>

             
              <div class="rodape">
                <p>2023 apg to Login your account | ThugXD @copyright</p>
              </div>
        </form>        
    </div>
</body>
</html>