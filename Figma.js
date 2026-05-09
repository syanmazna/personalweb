const btnEmail = document.getElementById('btn-email');

btnEmail.addEventListener('click', async (e) => {
    e.preventDefault(); 

    const { value: formValues } = await Swal.fire({
        title: 'Send a Message',
        html:
            '<input id="swal-name" class="swal2-input" placeholder="Your Name">' +
            '<textarea id="swal-message" class="swal2-textarea" placeholder="Write your message here..."></textarea>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Send 🚀',
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const message = document.getElementById('swal-message').value;
            if (!name || !message) {
                Swal.showValidationMessage('Isi nama dan pesannya dulu ya!');
            }
            return { name, message };
        }
    });

    if (formValues) {
        Swal.fire({ title: 'Sending...', didOpen: () => { Swal.showLoading() } });

        const templateParams = {
            from_name: formValues.name,
            message: formValues.message 
        };

        emailjs.send('service_r8kh2gr', 'template_atvan2i', templateParams)
            .then(() => {
                Swal.fire('Berhasil!', 'Pesan sudah masuk ke email Syan.', 'success');
            }, (error) => {
                Swal.fire('Gagal!', 'Cek koneksi atau ID EmailJS kamu.', 'error');
            });
    }
});