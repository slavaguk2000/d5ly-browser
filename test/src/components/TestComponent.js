import flate from 'wasm-flate';
import pako from 'pako';



async function TestComponent() {

    const data = crypto.randomBytes(99990).toString('hex');


    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode('Compressing Benchmark');

    div.className = 'main';
    h1.appendChild(h1Text);
    document.body.appendChild(div);
    div.appendChild(h1);

    //pako
    const pPako = document.createElement('p');
    const pTextPako = document.createTextNode('');



    //wasm-flate
    const pWasmFlate = document.createElement('p');
    const pWasmFlateText = document.createTextNode('');



    //cool us
    const pUs = document.createElement('p');
    const pUsText = document.createTextNode('');


    //show results
    pPako.appendChild(pTextPako);
    pTextPako.appendChild(pPako);

    pWasmFlate.appendChild(pText);
    pWasmFlateText.appendChild(p);

    pUs.appendChild(pText);
    pUsText.appendChild(p);
}

export default TestComponent;
