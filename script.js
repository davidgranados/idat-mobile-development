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

    // Apply syntax highlighting to code blocks using Highlight.js
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // Add syntax highlighting to playground textarea
    const playgroundCode = document.getElementById('playground-code');
    if (playgroundCode) {
        playgroundCode.addEventListener('input', debounce(() => {
            highlightTextarea(playgroundCode);
        }, 300));
    }

    // Add syntax highlighting to exercise textareas
    const exerciseTextareas = document.querySelectorAll('.exercise textarea');
    exerciseTextareas.forEach(textarea => {
        textarea.addEventListener('input', debounce(() => {
            highlightTextarea(textarea);
        }, 300));
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
                    case 4:
                        testData = [{nombre: 'Ana'}, {nombre: 'Luis'}, {nombre: 'María'}];
                        expectedResult = [{nombre: 'Ana', id: 1}, {nombre: 'Luis', id: 2}, {nombre: 'María', id: 3}];
                        userResult = executeUserCode(code, 'usuarios', testData);
                        break;
                    case 5:
                        testData = [{nombre: 'Ana García', salario: 50000, departamento: 'IT'}, {nombre: 'Luis Pérez', salario: 45000, departamento: 'HR'}];
                        expectedResult = ['Ana G. (IT) - $50,000', 'Luis P. (HR) - $45,000'];
                        userResult = executeUserCode(code, 'empleados', testData);
                        break;
                    case 6:
                        testData = [
                            {id: 1, productos: [{nombre: 'Laptop', precio: 1000}, {nombre: 'Mouse', precio: 25}], cliente: 'Ana'},
                            {id: 2, productos: [{nombre: 'Teclado', precio: 50}], cliente: 'Luis'}
                        ];
                        expectedResult = [
                            {id: 1, cliente: 'Ana', totalProductos: 2, totalPrecio: 1025, resumen: 'Ana: 2 productos - $1,025'},
                            {id: 2, cliente: 'Luis', totalProductos: 1, totalPrecio: 50, resumen: 'Luis: 1 productos - $50'}
                        ];
                        userResult = executeUserCode(code, 'pedidos', testData);
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
                    case 4:
                        testData = [{nombre: 'Laptop', stock: 5}, {nombre: 'Mouse', stock: 0}, {nombre: 'Teclado', stock: 3}];
                        expectedResult = [{nombre: 'Laptop', stock: 5}, {nombre: 'Teclado', stock: 3}];
                        userResult = executeUserCode(code, 'productos', testData);
                        break;
                    case 5:
                        testData = [
                            {nombre: 'Ana', activo: true, ultimoLogin: '2024-01-15'},
                            {nombre: 'Luis', activo: false, ultimoLogin: '2023-12-01'},
                            {nombre: 'María', activo: true, ultimoLogin: '2024-01-10'}
                        ];
                        expectedResult = [
                            {nombre: 'Ana', activo: true, ultimoLogin: '2024-01-15'},
                            {nombre: 'María', activo: true, ultimoLogin: '2024-01-10'}
                        ];
                        userResult = executeUserCode(code, 'usuarios', testData);
                        break;
                    case 6:
                        testData = [
                            {id: 1, monto: 1500, tipo: 'deposito', fecha: '2024-01-15', categoria: 'salario'},
                            {id: 2, monto: 50, tipo: 'retiro', fecha: '2024-01-16', categoria: 'comida'},
                            {id: 3, monto: 2000, tipo: 'deposito', fecha: '2024-01-10', categoria: 'freelance'}
                        ];
                        expectedResult = [
                            {id: 1, monto: 1500, tipo: 'deposito', fecha: '2024-01-15', categoria: 'salario'},
                            {id: 2, monto: 50, tipo: 'retiro', fecha: '2024-01-16', categoria: 'comida'},
                            {id: 3, monto: 2000, tipo: 'deposito', fecha: '2024-01-10', categoria: 'freelance'}
                        ];
                        userResult = executeUserCode(code, 'transacciones', testData);
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
                    case 4:
                        testData = [85, 92, 78, 96, 88];
                        expectedResult = 87.8;
                        userResult = executeUserCode(code, 'calificaciones', testData);
                        // Round to 1 decimal for comparison
                        if (typeof userResult === 'number') {
                            userResult = Math.round(userResult * 10) / 10;
                        }
                        break;
                    case 5:
                        testData = [
                            {nombre: 'iPhone', categoria: 'electronics', precio: 999},
                            {nombre: 'Libro JS', categoria: 'books', precio: 30},
                            {nombre: 'Samsung TV', categoria: 'electronics', precio: 800}
                        ];
                        expectedResult = {electronics: ['iPhone', 'Samsung TV'], books: ['Libro JS']};
                        userResult = executeUserCode(code, 'productos', testData);
                        break;
                    case 6:
                        testData = [
                            {vendedor: 'Ana', ventas: [100, 200, 150]},
                            {vendedor: 'Luis', ventas: [300, 250, 400]},
                            {vendedor: 'María', ventas: [180, 220, 190]}
                        ];
                        expectedResult = {
                            totalGeneral: 1990,
                            promedioGeneral: 221.11,
                            mejorVendedor: 'Luis',
                            totalPorVendedor: {Ana: 450, Luis: 950, María: 590}
                        };
                        userResult = executeUserCode(code, 'ventasData', testData);
                        // Round numerical values for comparison
                        if (userResult && typeof userResult === 'object') {
                            if (userResult.promedioGeneral) {
                                userResult.promedioGeneral = Math.round(userResult.promedioGeneral * 100) / 100;
                            }
                        }
                        break;
                }
                break;

            case 'combined':
                switch(exerciseNumber) {
                    case 1:
                        testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                        expectedResult = 60; // [2,4,6,8,10] -> [4,8,12,16,20] -> 60
                        userResult = executeUserCode(code, 'numeros', testData);
                        break;
                    case 2:
                        testData = [
                            {producto: 'Laptop', region: 'Norte', ventas: 150, precio: 1000},
                            {producto: 'Mouse', region: 'Sur', ventas: 300, precio: 25},
                            {producto: 'Teclado', region: 'Norte', ventas: 200, precio: 50}
                        ];
                        expectedResult = 160000; // Norte: (150*1000) + (200*50) = 150000 + 10000 = 160000
                        userResult = executeUserCode(code, 'ventasRegion', testData);
                        break;
                    case 3:
                        testData = [
                            {nombre: 'Ana', edad: 25, compras: [{categoria: 'tech', satisfaccion: 4.5, precio: 1000}, {categoria: 'books', satisfaccion: 4.0, precio: 30}]},
                            {nombre: 'Luis', edad: 30, compras: [{categoria: 'tech', satisfaccion: 3.5, precio: 800}]}
                        ];
                        expectedResult = 'tech'; // Only tech appears in high satisfaction purchases from young users
                        userResult = executeUserCode(code, 'usuariosData', testData);
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

// Challenge exercise checking function
function checkChallengeExercise() {
    const code = document.getElementById('challenge-exercise').value;
    const resultElement = document.getElementById('challenge-result');

    // Clear previous result
    resultElement.className = 'exercise-result';
    resultElement.textContent = '';

    if (!code.trim()) {
        showResult(resultElement, 'Por favor, escribe algo de código para verificar.', 'error');
        return;
    }

    try {
        // Test data
        const estudiantes = [
            {nombre : "Juan Luis Guerra", puntuacion : [15, 13, 19]},
            {nombre : "Roberto Carlos", puntuacion : [13, 11, 10]},
            {nombre : "Luis Miguel", puntuacion : [17, 16, 20]},
            {nombre : "Renzo Costa", puntuacion : [10, 11, 12]}
        ];

        // Calculate expected result
        const expectedResult = estudiantes
            .map(estudiante => ({
                ...estudiante,
                promedio: estudiante.puntuacion.reduce((sum, nota) => sum + nota, 0) / estudiante.puntuacion.length
            }))
            .filter(estudiante => estudiante.promedio > 15);

        // Execute user code
        const userResult = executeUserCode(code, 'estudiantes', estudiantes);

        // Validate result structure and values
        if (validateChallengeResult(userResult, expectedResult)) {
            showResult(resultElement,
                '¡Excelente! 🎉 Tu solución es correcta.\n' +
                `Estudiantes aprobados: ${userResult.length}\n` +
                `${userResult.map(e => `${e.nombre}: ${e.promedio.toFixed(2)}`).join('\n')}`,
                'success'
            );
        } else {
            showResult(resultElement,
                `Incorrecto. Revisa tu solución.\n` +
                `Esperado: ${expectedResult.length} estudiantes con promedio > 15\n` +
                `Tu resultado: ${JSON.stringify(userResult, null, 2)}`,
                'error'
            );
        }

    } catch (error) {
        showResult(resultElement, `Error en el código: ${error.message}\n\nTip: Asegúrate de usar map, filter y reduce correctamente`, 'error');
    }
}

// Function to validate challenge exercise result
function validateChallengeResult(userResult, expectedResult) {
    if (!Array.isArray(userResult)) return false;
    if (userResult.length !== expectedResult.length) return false;

    // Check if all required students are present with correct averages
    for (let i = 0; i < expectedResult.length; i++) {
        const expected = expectedResult[i];
        const user = userResult.find(student => student.nombre === expected.nombre);

        if (!user) return false;
        if (!user.hasOwnProperty('promedio')) return false;
        if (Math.abs(user.promedio - expected.promedio) > 0.01) return false;
        if (user.promedio <= 15) return false;
    }

    return true;
}

// Function to re-highlight code blocks after dynamic content changes
function refreshSyntaxHighlighting() {
    if (typeof hljs !== 'undefined') {
        // Remove existing highlighting
        document.querySelectorAll('.code-block pre code').forEach(block => {
            if (block.dataset.highlighted) {
                delete block.dataset.highlighted;
                hljs.highlightElement(block);
            }
        });
    }
}

// Debounce function to limit how often highlighting runs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Simple syntax highlighting for textareas (just basic styling)
function highlightTextarea(textarea) {
    // For textareas, we can't do full syntax highlighting like with div elements
    // But we can add visual cues through CSS classes based on content
    const code = textarea.value;

    // Add different background tints based on content
    if (code.includes('.map(')) {
        textarea.classList.add('has-map');
    } else {
        textarea.classList.remove('has-map');
    }

    if (code.includes('.filter(')) {
        textarea.classList.add('has-filter');
    } else {
        textarea.classList.remove('has-filter');
    }

    if (code.includes('.reduce(')) {
        textarea.classList.add('has-reduce');
    } else {
        textarea.classList.remove('has-reduce');
    }
}
