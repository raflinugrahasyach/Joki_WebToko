// ============== File: client/assets/js/utils/icons.js ==============
export const ICONS = {
    logo: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 7.5C7.5 5.84315 8.84315 4.5 10.5 4.5H13.5C15.1569 4.5 16.5 5.84315 16.5 7.5V11.25H7.5V7.5Z" class="fill-emerald-500"/><path d="M5.25 11.25H18.75L19.5 17.25C19.5 18.4926 18.4926 19.5 17.25 19.5H6.75C5.50736 19.5 4.5 18.4926 4.5 17.25L5.25 11.25Z" class="fill-emerald-600"/><path d="M10.5 9.75H13.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};


// ============== File: client/assets/js/utils/toast.js ==============
export function showToast(message, isError = false) {
    const toastId = 'toast-notification';
    const existingToast = document.getElementById(toastId);
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = toastId;
    const bgColor = isError ? 'bg-red-600' : 'bg-gray-900';
    const icon = isError ? `<i data-lucide="alert-circle" class="inline-block mr-2 w-5 h-5 text-white"></i>` : `<i data-lucide="check-circle" class="inline-block mr-2 w-5 h-5 text-emerald-400"></i>`;
    
    toast.className = `fixed top-5 right-5 ${bgColor} text-white py-3 px-6 rounded-lg shadow-xl text-sm z-50 animate-fade-in-down`;
    toast.innerHTML = `${icon} ${message}`;
    
    document.body.appendChild(toast);
    lucide.createIcons({ attrs: { 'stroke-width': 2 } });

    setTimeout(() => {
        toast.classList.remove('animate-fade-in-down');
        toast.classList.add('animate-fade-out-up');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
