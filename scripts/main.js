function marcarComprado(checkbox) {
    const item = checkbox.closest('.item');
    if (checkbox.checked){
        item.classList.add('comprado');
    } else {
        item.classList.remove('comprado');
    }
}

