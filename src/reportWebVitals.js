/*
 * Необязательный сбор показателей скорости страницы.
 * Без функции onPerfEntry ничего не делает. Для вывода измерений можно вызвать reportWebVitals(console.log).
 * Библиотека загружается через import только при включённом измерении.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
