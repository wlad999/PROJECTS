export const genarateId = notes => {
  // Функция возвращяет минимальный свободный айди
  // Функция принимает массив с уже существующими ToDo

  let result;
  const mass = notes.reduce((acc, el) => acc.concat(el.id), []); // Сохраняем в массив существующие ID

  for (let i = 1; i < Infinity; i++) {
    if (!mass.includes(i)) {
      // Проверяем есть ли в массиве айди по возрастанию. Если нет, то возвращяем его
      result = i;
      break;
    }
  }
  console.log(result);
  return result;

  // ИЛИ ВАРИАНТ №2
  // Функция возвращяет последний айди +1
  //   const lastId = notes[notes.length - 1].id;
  //   console.log(lastId + 1);
  //   return lastId + 1;
};

// _______________________RANDOMIZER
export const generatePhrase = num => Math.floor(Math.random() * num);
