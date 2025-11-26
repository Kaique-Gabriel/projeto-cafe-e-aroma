// src/utils/EmailService.js

export const enviarCodigoEmail = async (email, codigo) => {
  console.log("Enviando código para:", email);
  console.log("Código:", codigo);

  // Simulação de envio (por enquanto só loga no console)
  // Quando tiver backend real:
  // await fetch("https://seusite.com/api/enviar_codigo.php", { ... })

  return true; // simulando sucesso
};
