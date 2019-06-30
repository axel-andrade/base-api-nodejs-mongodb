var Messages = {
    success: {
        CREATED_SUCCESS: "O objeto foi criado com sucesso",
        DOWNLOAD_SUCCESS: "Download realizado com sucesso",
        DELETED_SUCCESS: "O objeto foi removido com sucesso",
        EDITED_SUCCESS: "O objeto foi atualizado com sucesso",
        RECOVER_EMAIL_SUCCESS: "Siga os passos enviados ao seu e-mail para redefinir sua senha",
        LOGOUT_SUCCESS: "Você foi deslogado com sucesso",
        LIKE_POST: "Este usuário já curtiu esta publicação",

    },
    push: {
    
    },
    error: {

        ERROR_UNAUTHORIZED: {code: 101, message: "Você não possui autorização para realizar esta ação."},
        INVALID_USERNAME: {code: 101, message: "Nome de usuário ou senha incorretos, tente novamente."},
        ERROR_ACCESS_REQUIRED: {code: 101, message: "Você não possui privilégio para realizar esta ação."},
        ERROR_SESSION_NOT_FOUND: {code: 101, message: "Sessão não encontrada"},
        USERNAME_EXISTS: {code: 101, message: "Conta já existe para este nome de usuário."},
        ERROR_EMAIL_NOT_FOUND: {code: 101, message: "Email não encontrado."},
        ERROR_TOKEN_NOT_FOUND: {code: 101, message: "Token inválido."},
        INVALID_OLD_PASSWORD: {code: 101, message: "Senha antiga incorreta."},
        USER_NOT_FOUND: {code: 101, message: "Usuário não encontrado."},
        POST_NOT_FOUND: {code: 101, message: "Publicação não encontrada."},
        COMMENT_NOT_FOUND: {code: 101, message: "Comentário não encontrado."},
        DONATION_NOT_FOUND: {code: 101, message: "Doação não encontrada."},
        INVALID_VALUE: {code: 101, message: "Valor inválido."},
        INVALID_TYPE_POST: {code: 101, message: "Tipo de publicação inválido."},
        INVALID_TYPE_DONATION: {code: 101, message: "Tipo de doação inválida."},
        NOTIFICATION_NOT_FOUND: {code: 101, message: "Notificação não encontrada."},
        DATE_REQUIRED: {code: 101, message: "Para publicações do tipo evento o parâmetro date é obrigatório"},
        INVALID_DATE: {code: 101, message: "Data inválida."},
        INVALID_IMAGES: {code: 101, message: "O campo images está incompleto ou é inválido."}
    },
    email: {
        RECOVER: "Recuperar Senha",
        WELCOME: "Seja bem vindo",
    },
};

module.exports = Messages;