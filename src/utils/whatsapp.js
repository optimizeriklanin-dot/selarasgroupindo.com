/**
 * WhatsApp Helper Utility
 * Generate auto-message links for WhatsApp
 */

const WHATSAPP_NUMBER = '6281298974293';

/**
 * Generate WhatsApp link with auto message
 */
export function generateWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Generate WhatsApp link for product inquiry
 */
export function productInquiryLink(productName, productId) {
  const message = `Halo, saya tertarik dengan produk *${productName}* (ID: ${productId}) di selarasgroupindo.com. Mohon informasi lebih lanjut mengenai harga dan ketersediaan. Terima kasih! 🙏`;
  return generateWhatsAppLink(message);
}

/**
 * Generate WhatsApp link for custom order
 */
export function customOrderLink(data) {
  const message = `🛒 *PERMINTAAN CUSTOM ORDER*\n\n` +
    `Nama: ${data.name || '-'}\n` +
    `Perusahaan: ${data.company || '-'}\n` +
    `Jenis Tas: ${data.bagType || '-'}\n` +
    `Jumlah: ${data.quantity || '-'}\n` +
    `Bahan: ${data.material || '-'}\n` +
    `Warna: ${data.color || '-'}\n` +
    `Keterangan: ${data.notes || '-'}\n\n` +
    `Mohon dibuatkan penawaran. Terima kasih!`;
  return generateWhatsAppLink(message);
}

/**
 * Generate general WhatsApp CTA link
 */
export function generalCTALink() {
  const message = `Halo PT Selaras Serasa Sejalan! 👋\nSaya ingin bertanya mengenai produk tas promosi. Bisa dibantu?`;
  return generateWhatsAppLink(message);
}

export default {
  generateWhatsAppLink,
  productInquiryLink,
  customOrderLink,
  generalCTALink,
  WHATSAPP_NUMBER,
};
