// Sample data for demonstrations
const productos = [
    { nombre: "Laptop", precio: 1200, categoria: "electrónicos", descuento: 0.1 },
    { nombre: "Teléfono", precio: 800, categoria: "electrónicos", descuento: 0.15 },
    { nombre: "Libro", precio: 25, categoria: "educación", descuento: 0.05 },
    { nombre: "Auriculares", precio: 150, categoria: "electrónicos", descuento: 0.2 },
    { nombre: "Mesa", precio: 300, categoria: "muebles", descuento: 0.1 }
];

// Utility function to display results
function mostrarResultado(elementId, resultado) {
    const element = document.getElementById(elementId);
    element.textContent = JSON.stringify(resultado, null, 2);
    element.style.display = 'block';
}

// MAP method examples
function ejecutarMap() {
    console.log("=== Ejecutando MAP ===");

    // Get product names
    const nombres = productos.map(producto => producto.nombre);
    console.log("Nombres:", nombres);

    // Calculate discounted prices
    const preciosConDescuento = productos.map(producto => {
        return producto.precio * (1 - producto.descuento);
    });
    console.log("Precios con descuento:", preciosConDescuento);

    const resultado = {
        "Nombres de productos": nombres,
        "Precios con descuento": preciosConDescuento.map(precio => `$${precio.toFixed(2)}`)
    };

    mostrarResultado('map-result', resultado);
}

function ejecutarMapFor() {
    console.log("=== Ejecutando MAP con FOR ===");

    // Custom MAP function using FOR loop
    function mapConFor(array, callback) {
        const resultado = [];
        for (let i = 0; i < array.length; i++) {
            resultado.push(callback(array[i], i, array));
        }
        return resultado;
    }

    // Using the custom function like MAP
    const nombres = mapConFor(productos, producto => producto.nombre);
    console.log("Nombres (FOR):", nombres);

    const preciosConDescuento = mapConFor(productos, producto => {
        return producto.precio * (1 - producto.descuento);
    });
    console.log("Precios con descuento (FOR):", preciosConDescuento);

    const resultado = {
        "Nombres de productos (mapConFor)": nombres,
        "Precios con descuento (mapConFor)": preciosConDescuento.map(precio => `$${precio.toFixed(2)}`)
    };

    mostrarResultado('map-result', resultado);
}

// FILTER method examples
function ejecutarFilter() {
    console.log("=== Ejecutando FILTER ===");

    // Filter electronic products
    const electronicos = productos.filter(producto =>
        producto.categoria === "electrónicos"
    );
    console.log("Productos electrónicos:", electronicos);

    // Filter expensive products (price > 200)
    const productosCaros = productos.filter(producto =>
        producto.precio > 200
    );
    console.log("Productos caros:", productosCaros);

    const resultado = {
        "Productos electrónicos": electronicos.map(p => `${p.nombre} - $${p.precio}`),
        "Productos caros (>$200)": productosCaros.map(p => `${p.nombre} - $${p.precio}`)
    };

    mostrarResultado('filter-result', resultado);
}

function ejecutarFilterFor() {
    console.log("=== Ejecutando FILTER con FOR ===");

    // Custom FILTER function using FOR loop
    function filterConFor(array, callback) {
        const resultado = [];
        for (let i = 0; i < array.length; i++) {
            if (callback(array[i], i, array)) {
                resultado.push(array[i]);
            }
        }
        return resultado;
    }

    // Using the custom function like FILTER
    const electronicos = filterConFor(productos,
        producto => producto.categoria === "electrónicos"
    );
    console.log("Productos electrónicos (FOR):", electronicos);

    const productosCaros = filterConFor(productos,
        producto => producto.precio > 200
    );
    console.log("Productos caros (FOR):", productosCaros);

    const resultado = {
        "Productos electrónicos (filterConFor)": electronicos.map(p => `${p.nombre} - $${p.precio}`),
        "Productos caros (filterConFor)": productosCaros.map(p => `${p.nombre} - $${p.precio}`)
    };

    mostrarResultado('filter-result', resultado);
}

// REDUCE method examples
function ejecutarReduce() {
    console.log("=== Ejecutando REDUCE ===");

    // Example 1: Sum all prices
    const precioTotal = productos.reduce((suma, producto) => {
        return suma + producto.precio;
    }, 0);
    console.log("Precio total:", precioTotal); // 2475

    // Example 2: Find most expensive product
    const productoMasCaro = productos.reduce((masCaro, producto) => {
        return producto.precio > masCaro.precio ? producto : masCaro;
    });
    console.log("Más caro:", productoMasCaro.nombre); // Laptop

    // Example 3: Group products by category
    const porCategoria = productos.reduce((grupos, producto) => {
        if (!grupos[producto.categoria]) {
            grupos[producto.categoria] = [];
        }
        grupos[producto.categoria].push(producto);
        return grupos;
    }, {});
    console.log("Agrupado por categoría:", porCategoria);

    const resultado = {
        "Ejemplo 1 - Precio total": `$${precioTotal}`,
        "Ejemplo 2 - Producto más caro": `${productoMasCaro.nombre} - $${productoMasCaro.precio}`,
        "Ejemplo 3 - Productos por categoría": Object.keys(porCategoria).reduce((acc, categoria) => {
            acc[categoria] = porCategoria[categoria].map(p => p.nombre);
            return acc;
        }, {})
    };

    mostrarResultado('reduce-result', resultado);
}

function ejecutarReduceFor() {
    console.log("=== Ejecutando REDUCE con FOR ===");

    // Custom REDUCE function using FOR loop
    function reduceConFor(array, callback, valorInicial) {
        let acumulador = valorInicial;
        let inicio = 0;

        if (valorInicial === undefined) {
            acumulador = array[0];
            inicio = 1;
        }

        for (let i = inicio; i < array.length; i++) {
            acumulador = callback(acumulador, array[i], i, array);
        }
        return acumulador;
    }

    // Example 1: Sum all prices
    const precioTotal = reduceConFor(productos,
        (suma, producto) => suma + producto.precio, 0
    );
    console.log("Precio total (FOR):", precioTotal);

    // Example 2: Find most expensive product
    const productoMasCaro = reduceConFor(productos,
        (masCaro, producto) => producto.precio > masCaro.precio ? producto : masCaro
    );
    console.log("Más caro (FOR):", productoMasCaro.nombre);

    // Example 3: Group products by category
    const porCategoria = reduceConFor(productos, (grupos, producto) => {
        if (!grupos[producto.categoria]) {
            grupos[producto.categoria] = [];
        }
        grupos[producto.categoria].push(producto);
        return grupos;
    }, {});
    console.log("Agrupado por categoría (FOR):", porCategoria);

    const resultado = {
        "Ejemplo 1 - Precio total (reduceConFor)": `$${precioTotal}`,
        "Ejemplo 2 - Producto más caro (reduceConFor)": `${productoMasCaro.nombre} - $${productoMasCaro.precio}`,
        "Ejemplo 3 - Productos por categoría (reduceConFor)": Object.keys(porCategoria).reduce((acc, categoria) => {
            acc[categoria] = porCategoria[categoria].map(p => p.nombre);
            return acc;
        }, {})
    };

    mostrarResultado('reduce-result', resultado);
}

// Playground functionality
function ejecutarPlayground() {
    const code = document.getElementById('playground-code').value;
    const resultElement = document.getElementById('playground-result');

    if (!code.trim()) {
        resultElement.textContent = "Por favor, escribe algo de código para ejecutar.";
        resultElement.style.display = 'block';
        return;
    }

    try {
        // Create a safe evaluation context with proper console handling
        let capturedLogs = [];
        const originalConsoleLog = console.log;

        // Temporarily override console.log to capture output
        console.log = function(...args) {
            capturedLogs.push(args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
            originalConsoleLog.apply(console, args);
        };

        // Create execution context
        const context = {
            productos: productos,
            console: console,
            Math: Math,
            JSON: JSON
        };

        // Execute the user's code
        const func = new Function(...Object.keys(context), `return ${code}`);
        const result = func(...Object.values(context));

        // Restore original console.log
        console.log = originalConsoleLog;

        console.log("Resultado del playground:", result);

        // Display results
        let output = '';

        // If there were console.log calls, show them
        if (capturedLogs.length > 0) {
            output += "Console output:\n" + capturedLogs.join('\n') + '\n\n';
        }

        // Show the return value
        if (result === undefined) {
            output += "Resultado: undefined";
        } else if (result === null) {
            output += "Resultado: null";
        } else {
            output += "Resultado:\n" + JSON.stringify(result, null, 2);
        }

        resultElement.textContent = output;
        resultElement.style.display = 'block';

    } catch (error) {
        console.error("Error en playground:", error);
        resultElement.textContent = `Error: ${error.message}\n\nTip: Asegúrate de escribir una expresión válida como:\n- productos.map(p => p.nombre)\n- productos.filter(p => p.precio > 100)\n- productos.reduce((sum, p) => sum + p.precio, 0)`;
        resultElement.style.display = 'block';
    }
}

// Add smooth scrolling behavior
document.addEventListener('DOMContentLoaded', function() {
    // Add some interactive features when the page loads
    console.log("🚀 Sitio interactivo de métodos de arrays cargado!");
    console.log("📊 Datos de ejemplo disponibles:", productos);

    // Add keyboard shortcut for playground
    document.getElementById('playground-code').addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            ejecutarPlayground();
        }
    });

    // Apply better code formatting
    const codeBlocks = document.querySelectorAll('.code-block pre code');
    codeBlocks.forEach(block => {
        // Ensure proper code formatting without breaking HTML
        block.style.display = 'block';
        block.style.whiteSpace = 'pre';
        block.style.overflow = 'auto';
    });
});

// Additional utility functions for educational purposes
function compararRendimiento() {
    console.log("=== Comparación de Rendimiento ===");

    // Create a larger dataset for performance comparison
    const largeArray = Array.from({length: 100000}, (_, i) => ({
        id: i,
        value: Math.random() * 1000,
        category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
    }));

    console.time('Map method');
    const mapResult = largeArray.map(item => item.value * 2);
    console.timeEnd('Map method');

    console.time('For loop equivalent');
    const forResult = [];
    for (let i = 0; i < largeArray.length; i++) {
        forResult.push(largeArray[i].value * 2);
    }
    console.timeEnd('For loop equivalent');

    console.log("Ambos métodos produjeron el mismo resultado:",
        JSON.stringify(mapResult.slice(0, 5)) === JSON.stringify(forResult.slice(0, 5)));
}

// Function to demonstrate method chaining
function demostrarChaining() {
    console.log("=== Demostración de Encadenamiento de Métodos ===");

    const resultado = productos
        .filter(producto => producto.categoria === "electrónicos")  // Filter electronics
        .map(producto => ({                                         // Transform to simpler objects
            nombre: producto.nombre,
            precioFinal: producto.precio * (1 - producto.descuento)
        }))
        .reduce((total, producto) => total + producto.precioFinal, 0); // Sum all final prices

    console.log("Precio total de electrónicos con descuento:", resultado);

    // Equivalent with for loops (much more verbose)
    console.log("Equivalente con bucles FOR:");

    // Step 1: Filter
    const electronicosFor = [];
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].categoria === "electrónicos") {
            electronicosFor.push(productos[i]);
        }
    }

    // Step 2: Map
    const transformadosFor = [];
    for (let i = 0; i < electronicosFor.length; i++) {
        transformadosFor.push({
            nombre: electronicosFor[i].nombre,
            precioFinal: electronicosFor[i].precio * (1 - electronicosFor[i].descuento)
        });
    }

    // Step 3: Reduce
    let totalFor = 0;
    for (let i = 0; i < transformadosFor.length; i++) {
        totalFor += transformadosFor[i].precioFinal;
    }

    console.log("Resultado con FOR:", totalFor);
    console.log("Ambos resultados son iguales:", resultado === totalFor);

    return {
        conMetodos: resultado,
        conBucles: totalFor,
        sonIguales: resultado === totalFor
    };
}

// Exercise checking functionality
function checkExercise(method, exerciseNumber) {
    const code = document.getElementById(`exercise-${method}-${exerciseNumber}`).value;
    const resultElement = document.getElementById(`result-${method}-${exerciseNumber}`);

    // Clear previous result
    resultElement.className = 'exercise-result';
    resultElement.textContent = '';

    if (!code.trim()) {
        showResult(resultElement, 'Por favor, escribe algo de código para verificar.', 'error');
        return;
    }

    try {
        let userResult;
        let expectedResult;
        let testData;

        // Prepare test data and expected results for each exercise
        switch(method) {
            case 'map':
                switch(exerciseNumber) {
                    case 1:
                        testData = [0, 25, 30, 40];
                        expectedResult = [32, 77, 86, 104];
                        userResult = executeUserCode(code, 'temperaturas', testData);
                        break;
                    case 2:
                        testData = ['Ana', 'Carlos', 'María'];
                        expectedResult = ['<li>Ana</li>', '<li>Carlos</li>', '<li>María</li>'];
                        userResult = executeUserCode(code, 'nombres', testData);
                        break;
                    case 3:
                        testData = [1, 2, 3, 4];
                        expectedResult = [3.14, 12.57, 28.27, 50.27];
                        userResult = executeUserCode(code, 'radios', testData);
                        // Round to 2 decimals for comparison
                        if (Array.isArray(userResult)) {
                            userResult = userResult.map(val => Math.round(val * 100) / 100);
                        }
                        break;
                }
                break;

            case 'filter':
                switch(exerciseNumber) {
                    case 1:
                        testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                        expectedResult = [2, 4, 6, 8, 10];
                        userResult = executeUserCode(code, 'numeros', testData);
                        break;
                    case 2:
                        testData = ['hola', 'javascript', 'es', 'genial', 'programar'];
                        expectedResult = ['javascript', 'programar'];
                        userResult = executeUserCode(code, 'palabras', testData);
                        break;
                    case 3:
                        testData = [{nombre: 'Ana', nota: 85}, {nombre: 'Luis', nota: 62}, {nombre: 'María', nota: 91}];
                        expectedResult = [{nombre: 'Ana', nota: 85}, {nombre: 'María', nota: 91}];
                        userResult = executeUserCode(code, 'estudiantes', testData);
                        break;
                }
                break;

            case 'reduce':
                switch(exerciseNumber) {
                    case 1:
                        testData = [1, 2, 3, 4, 5];
                        expectedResult = 15;
                        userResult = executeUserCode(code, 'numeros', testData);
                        break;
                    case 2:
                        testData = [3, 7, 2, 9, 1, 5];
                        expectedResult = 9;
                        userResult = executeUserCode(code, 'numeros', testData);
                        break;
                    case 3:
                        testData = ['a', 'b', 'a', 'c', 'b', 'a'];
                        expectedResult = {a: 3, b: 2, c: 1};
                        userResult = executeUserCode(code, 'letras', testData);
                        break;
                }
                break;
        }

        // Compare results
        if (compareResults(userResult, expectedResult)) {
            showResult(resultElement, '¡Correcto! 🎉 Tu solución funciona perfectamente.', 'success');
        } else {
            showResult(resultElement, `Incorrecto. Tu resultado: ${JSON.stringify(userResult)}\nEsperado: ${JSON.stringify(expectedResult)}`, 'error');
        }

    } catch (error) {
        showResult(resultElement, `Error en el código: ${error.message}`, 'error');
    }
}

function executeUserCode(code, varName, testData) {
    // Create a safe execution context
    const context = {
        [varName]: testData,
        Math: Math,
        console: console
    };

    // Try to execute the code
    const func = new Function(...Object.keys(context), `return ${code}`);
    return func(...Object.values(context));
}

function compareResults(result1, result2) {
    if (result1 === result2) return true;

    if (Array.isArray(result1) && Array.isArray(result2)) {
        if (result1.length !== result2.length) return false;
        return result1.every((val, index) => {
            if (typeof val === 'object' && typeof result2[index] === 'object') {
                return JSON.stringify(val) === JSON.stringify(result2[index]);
            }
            return val === result2[index];
        });
    }

    if (typeof result1 === 'object' && typeof result2 === 'object') {
        return JSON.stringify(result1) === JSON.stringify(result2);
    }

    return false;
}

function showResult(element, message, type) {
    element.textContent = message;
    element.className = `exercise-result ${type}`;
}
