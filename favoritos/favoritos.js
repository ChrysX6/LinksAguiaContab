function openModal(departmentId) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    const departmentContent = document.getElementById(departmentId).innerHTML;
    modalContent.innerHTML = departmentContent;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}