const assert = require('assert');
const myMap = new Map();

myMap
    .set(1, 'one')
    .set('Erick', { text: 'two' })
    .set(true, () => 'hello');

const myMapWithConstructor = new Map([
    ['1', 'str1'],
    ['1', 'num1'],
    [true, 'bool1']
]);

// console.log('myMap', myMap);
// console.log(myMap.get(1));

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Erick'), {text: 'two'});

// Em objects a chave só pode ser string ou symbol (number é coergido a string)

const onlyReference = { id: 1 };

myMap.set(onlyReference, { name: 'Rfontt' });

// console.log('get', myMap.get(onlyReference));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReference), { name: 'Rfontt' });

// Utilitários

assert.deepStrictEqual(myMap.size, 4);

// Para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if () = coerção implicíta para boolean e retorna false
// O jeito certo do Object é: ({ name: 'Rfontt }).hasOwnProperty('name2');

assert.ok(myMap.has(onlyReference));

// Para remover um item do objeto
// delete item.id
// imperfomático para o JS

assert.ok(myMap.delete(onlyReference));

// Não dá para iterar em Objects diretamente

assert.deepStrictEqual(JSON.stringify([...myMap]), '[[1,"one"],["Erick",{"text":"two"}],[true,null]]');

// for (const [key, value] of myMap) {
//     console.log(key);
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({}).toString() === '[object Object']
// ({ toString: () => 'hey' }).toString === 'hey'

// Qualquer chave pode colidir com as propriedades herdadas do objeto
// Como: construtor, toString, valueOf e etc...

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

myMap.set(actor);

assert.deepStrictEqual(myMap.has(actor), true);
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não da para limpar um objeto sem reassiná-lo.

myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// --- MeakMap 
// Para ser coletado após perder as referências 
// Usado em casos bem específicos

// Tem a maioria dos benefícios do Map
// Mas não é iterável -> Não dar para rodar um for of nele
// Só chaves de referências e que você já conheça
// Mais leve e preve leak de memória, porque depois que as instâncias saem da memória, tudo é limpo.

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);