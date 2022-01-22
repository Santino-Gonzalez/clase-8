/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar
Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

function validateNumberOfMembers(numberOfMembers) {
    if (numberOfMembers.length === 0){
        return "Este campo debe tener al menos un caracter"
    }
    if(!/^[0-9]+$/.test(numberOfMembers)){
        return "El numero de miembros solo puede contener numeros enteros"
    }
    return ""
}
function validateMemberAges(ages) {
    if (ages.length === 0){
        return "Este campo debe tener al menos un caracter"
    }
    if(!/^[0-9]+$/.test(ages)){
        return "Las edades de los miembros solo pueden contener numeros enteros"
    }
    return ""
}
function validateMemberSalaries(salaries) {
    if (salaries.length === 0){
        return "Este campo debe tener al menos un caracter"
    }
    if(!/^[0-9,]+$/.test(salaries)){
        return "Los salarios solo pueden contener numeros"
    }
    return ""
}

function createNewMember(){
    const $numberOfMembers = document.querySelector("#number-of-members").value

    for(let i=1; i <= $numberOfMembers; i++){
        const $div = document.createElement("div")
        $div.className = "member"

        const $mistakeContainer = document.createElement("label")
        $mistakeContainer.id = `mistake-member-${i}`
        $mistakeContainer.className = "mistake-member"
        const $label = document.createElement("label")
        $label.textContent = "Ingrese la edad del familiar Nº" + i + ":"
        const $input = document.createElement("input")
        $input.className = "members"
        $input.id = `member-${i}`
        $input.type = "number"
        $input.placeholder = "Edad del familiar"
        let $listOfMembers = document.querySelector("#list-of-members")

        $div.appendChild($label)
        $div.appendChild($input)
        $div.appendChild($mistakeContainer)
        $listOfMembers.appendChild($div)
    }
}

document.querySelector("#button-next").onclick = function(){
    const $numberOfMembers = document.querySelector("#number-of-members").value
    const $buttonSalaryAdd = document.querySelector("#add-salaries")
    const $buttonSalaryRemove = document.querySelector("#remove-salaries")
    const $buttonCalculate = document.querySelector("#button-calculate")
    const $buttonReset = document.querySelector("#reset")
    createNewMember()
    document.querySelector("#button-next").disabled = true
    document.querySelector("#add-salaries").disabled = false
    if ($numberOfMembers <= 0){
        document.querySelector("#button-next").disabled = false
    }
    if ($numberOfMembers > 0){
        $buttonSalaryAdd.className = ""
        $buttonSalaryRemove.className = ""
        $buttonCalculate.className = ""
        $buttonReset.className = ""
    }
    return false
}

function makeArrays(){
    let $members = document.querySelectorAll(".members")
  
    const mistakesAges = {};
  
    $members.forEach((input) => {
      mistakesAges[input.id] = validateMemberAges(input.value);
    });

    let array = []
    for(let i = 0; i < $members.length; i++){
        array.push(Number($members[i].value))
    }
    return { array, mistakesAges }
}

function calculateLowestNumber(number){
    let lowestNumber = number[0]
    for(let i = 0; i < number.length; i++){
        if(number[i] < lowestNumber){
            lowestNumber = number[i]
        }
    }
    return lowestNumber
}

function calculateAverageNumber(number){
    let average = 0
    for(let i = 0; i < number.length; i++){
        average = average + Number(number[i])
    }
    average = average / number.length
    return average
}

function calculateLargerNumber(number){
    let largerNumber = number[0]
    for(let i = 0; i < number.length; i++){
        if(number[i] > largerNumber){
            largerNumber = number[i]
        }
    }
    return largerNumber
}


function handleMistakesAges(mistakesAges){
    const $mistakesAgesLabels = document.querySelectorAll(".mistake-member")

    $mistakesAgesLabels.forEach(function (label){
        label.innerHTML = ""
    }
        )

    const keys = Object.keys(mistakesAges)
    let amountOfMistakes = 0

    keys.forEach(function(key){
        const mistake = mistakesAges[key]

        if(mistake){
            amountOfMistakes++

            const $mistakeContainer = document.querySelector(`#mistake-${key}`)
            const $mistake = document.createElement("label")
            
            $mistake.innerText = mistake
            $mistakeContainer.appendChild($mistake)
        }
    })
    return amountOfMistakes
}

function handleMistakesSalaries(mistakesSalaries){
    const $mistakesAgesLabels = document.querySelectorAll(".mistake-member")

    $mistakesAgesLabels.forEach(function (label){
        label.innerHTML = ""
    }
        )

    const keys = Object.keys(mistakesSalaries)
    let amountOfMistakes = 0

    keys.forEach(function(key){
        const mistake = mistakesSalaries[key]

        if(mistake){
            amountOfMistakes++

            const $mistakeContainer = document.querySelector(`#mistake-${key}`)
            const $mistake = document.createElement("label")
            
            $mistake.innerText = mistake
            $mistakeContainer.appendChild($mistake)
        }
    })
    return amountOfMistakes
}

document.querySelector("#button-calculate").onclick = function(){
    const agesObject = makeArrays()
    const array = agesObject.array
    const mistakesAges = agesObject.mistakesAges
    
    const agesIsSuccess = handleMistakesAges(mistakesAges) === 0

    if(agesIsSuccess){
        const youngest = calculateLowestNumber(array)
        const averageAgeOfTheFamily = calculateAverageNumber(array)
        const oldest = calculateLargerNumber(array)

        document.querySelector("#average-age-of-the-family").textContent = `El promedio del grupo familiar es de ${averageAgeOfTheFamily} años`
        document.querySelector("#youngest").textContent = `La edad mas baja de la familia es de ${youngest} años`
        document.querySelector("#oldest").textContent = `La edad mas alta de la familia es de ${oldest} años`
    }

    const $salariesInputs = document.getElementsByClassName("input-salaries")

    if($salariesInputs.length > 0){
        if(salariesIsSuccess){
        const $salaries = document.getElementsByClassName("input-salaries")
        const arrayOfSalaries = convertSalariesToArray($salaries)
        const lowerSalary = calculateLowestNumber(arrayOfSalaries)
        const higherSalary = calculateLargerNumber(arrayOfSalaries)
        const averageSalary = calculateAverageNumber(arrayOfSalaries)
        const averageMonthlySalary = calculateAverageMonthlySalary(arrayOfSalaries)

        const $emLowerSalary = document.querySelector("#lower-salary")
        const $emHigherSalary = document.querySelector("#higher-salary")
        const $emAverageSalary = document.querySelector("#average-salary")
            con-st $emAverageMonthlySalary = document.querySelector("#average-monthly-salary")

            $emAverageMonthlySalary.textContent = `El salario mensual promedio de la familia es de $${averageMonthlySalary}`
            $emLowerSalary.textContent = `El salario mas bajo de la familia es de $${lowerSalary}`
            $emHigherSalary.textContent = `El salario mas alto de la familia es de $${higherSalary}`
            $emAverageSalary.textContent = `El salario promedio de la familia es de $${averageSalary}`
        }
    }
}

document.querySelector("#reset").onclick = function(){
    let $members = document.querySelectorAll(".member")
    const $label = document.querySelectorAll(".label-salaries")

    for (let i = 0; i < $members.length; i++) {
        $members[i].remove();
    }

    for (let i = 0; i < $label.length; i++) {
        $label[i].remove();
    }

    document.querySelector("#average-age-of-the-family").textContent = ""
    document.querySelector("#youngest").textContent = ""
    document.querySelector("#oldest").textContent = ""

    document.querySelector("#lower-salary").textContent = ""
    document.querySelector("#higher-salary").textContent = ""
    document.querySelector("#average-salary").textContent = ""
    document.querySelector("#average-monthly-salary").textContent = ""

    document.querySelector("#add-salaries").disabled = false
    document.querySelector("#button-next").disabled = false
    
    const $buttonSalaryAdd = document.querySelector("#add-salaries")
    const $buttonSalaryRemove = document.querySelector("#remove-salaries")
    const $buttonCalculate = document.querySelector("#button-calculate")
    const $buttonReset = document.querySelector("#reset")

    $buttonSalaryAdd.className = "hidden"
    $buttonSalaryRemove.className = "hidden"
    $buttonCalculate.className = "hidden"
    $buttonReset.className = "hidden"

    document.querySelector("#number-of-members").value = ""
}




/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

document.querySelector("#add-salaries").onclick = function(){
    const $members = document.querySelectorAll(".member")
    const $salaryList = document.querySelector("#list-salaries")

    for(let i = 0; i < $members.length; i++){
        const $input = document.createElement("input")
        const $p = document.createElement("p")
        const $label = document.createElement("label")
        const $mistakeContainerSalary = document.createElement("label")
        $mistakeContainerSalary.id = `mistake-salary-${i + 1}`
        $mistakeContainerSalary.className = "mistake-salary"
        $label.textContent = `Salario del familiar Nº${i + 1}`
        $input.className = "input-salaries"
        $input.placeholder = "Salario del familiar"
        $input.type = "number"
        $label.className = "label-salaries"
        $p.appendChild($label)
        $p.appendChild($input)
        $p.appendChild($mistakeContainerSalary)
        $salaryList.appendChild($p)
    }
    document.querySelector("#add-salaries").disabled = true
}

document.querySelector("#remove-salaries").onclick = function(){
    const $salaries = document.querySelectorAll(".input-salaries")
    const $label = document.querySelectorAll(".label-salaries")
    for (let i = 0; i < $salaries.length; i++) {
        $salaries[i].remove();
    }
    for (let i = 0; i < $label.length; i++) {
        $label[i].remove();
    }
    document.querySelector("#add-salaries").disabled = false

    document.querySelector("#lower-salary").textContent = ""
    document.querySelector("#higher-salary").textContent = ""
    document.querySelector("#average-salary").textContent = ""
    document.querySelector("#average-monthly-salary").textContent = ""
}

function convertSalariesToArray(listOfSalaries){
    let array = []
    for(let i = 0; i < listOfSalaries.length; i++){
        if(listOfSalaries[i].value != 0){
            array.push(Number(listOfSalaries[i].value))
        }
    }
    return array
}

function calculateAverageMonthlySalary(salaries){
    let average = 0
    for(let i = 0; i < salaries.length; i++){
        average = average + (Number(salaries[i]) / 12)
    }
    average = average / salaries.length
    return average
}
