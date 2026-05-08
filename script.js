const btnEmail = document.getElementById('btn-email');

btnEmail.addEventListener('click', async (e) => {
    e.preventDefault(); 

    const { value: formValues } = await Swal.fire({
        title: 'Send a Message to Syan',
        html:
            '<input id="swal-name" class="swal2-input" placeholder="Your Name">' +
            '<input id="swal-email" class="swal2-input" placeholder="Your Email Address">' +
            '<textarea id="swal-message" class="swal2-textarea" placeholder="Write your message here..."></textarea>',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Send 🚀',
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const email = document.getElementById('swal-email').value;
            const message = document.getElementById('swal-message').value;
            if (!name || !email || !message) {
                Swal.showValidationMessage('Tolong isi semua field ya!');
            }
            return { name, email, message };
        }
    });

    if (formValues) {
        Swal.fire({ title: 'Sending...', didOpen: () => { Swal.showLoading() } });

        const templateParams = {
            from_name: formValues.name,
            user_email: formValues.email,
            message: formValues.message
        };

        // Pastikan ID ini sudah kamu ganti sesuai dashboard EmailJS
        emailjs.send('service_r8kh2gr', 'template_atvan2i', templateParams)
            .then(() => {
                Swal.fire('Berhasil!', 'Pesan kamu udah terkirim ke Syan.', 'success');
            }, (error) => {
                Swal.fire('Yah gagal...', 'Coba lagi nanti ya, kayaknya jaringannya rewel.', 'error');
            });
    }
});