import { IMG_URL, STATIC_HOST } from '../../../constants';

export default function innerProduct(product) {
  const linkProduct = `/${product.name}_i${product.id}`;
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMG_URL;
  const nameProduct = product.name;
  const priceVN = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.originalPrice);
  const pricePercent = product.promotionPercent
    ? '<span class="makeStyles-pricePercent"> -' + product.promotionPercent + '% </span>'
    : '';
  return {
    __html:
      '<a href="' +
      linkProduct +
      '"><div class="css-1vl0eai" ><div class="css-MuiPaper-root"><div class="css-pd8"><div class="makeStyles-divImg"><img class="makeStyles-productImg" src=' +
      thumbnailUrl +
      '  width="100%" alt="' +
      nameProduct +
      '"/></div><div class="css-4g6ai3"><div class="makeStyles-divName"><p class="makeStyles-name">' +
      nameProduct +
      '</p></div><span class="makeStyles-price">' +
      priceVN +
      '</span>' +
      pricePercent +
      '</div></div></div></div></a>',
  };
}