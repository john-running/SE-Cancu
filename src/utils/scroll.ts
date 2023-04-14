export const togglePageScroll = (isHiddenManual?: boolean) => {
  const html = document.querySelector('html');
  if (!html) return;
  const isHidden = isHiddenManual !== undefined ? isHiddenManual : html.style.overflow === 'hidden';
  html.style.overflow = isHidden ? 'auto' : 'hidden';
};
