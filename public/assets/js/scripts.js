const validateField = (field,message) => {
    if (!field.value && field.value.trim() == "") {
        alert(message);
        return false
    }
    return true;
}

const validateNotice = form => {
    return validateField(form.nome, "Nome deve ser informado!") && 
        validateField(form.email, "Email deve ser informado!") && 
        validateField(form.telefone, "O telefone deve ser informado!") && 
        validateField(form.cidade, "A cidade deve ser informada!") && 
        validateField(form.descricao, "Descrição deve ser informada!")
}

const validateSearch = form => {
    return validateField(form.key, "Informe o que deseja buscar!");
}

function redirecionar() {
    window.location.href = "/edit";
}