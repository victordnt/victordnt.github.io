main();
var roles;
var employees;
var divRole;
var rowEmployee;

async function getRoles() {
    this.roles = await (await fetch("https://604e23ef2a808e0017784a00.mockapi.io/api/roles")).json();
}

async function getEmployees() {
    let employees = await (await fetch('https://604e23ef2a808e0017784a00.mockapi.io/api/employees')).json();
    this.employees = employees;
}

function renderRoles() {
    const filters = document.querySelector('fieldset #filters');
    if(!divRole) divRole = filters.querySelector('div');
   filters.innerHTML="";
    this.roles.map((role) => {
        divElement = divRole.cloneNode(true);
        let checkbox = divElement.querySelector('input.role');
        let label = divElement.querySelector('label');
        label.setAttribute('for', role.id);
        checkbox.setAttribute('name', role.id);
        label.innerText = role.name;
        return divElement;
    }).forEach(div => {
       filters.appendChild(div);
    });
}

async function renderEmployees() {
    this.employees = await orderEmployees();
    const tbody = document.querySelector("div.employees>table>tbody");
    if(!rowEmployee) rowEmployee = tbody.querySelector('tr:nth-child(1)');
    tbody.innerHTML="";
    this.employees.map((employee) => {
        const row= rowEmployee.cloneNode(true);
        row.querySelector('td.id').innerText = employee.id;
        row.querySelector('td.name').innerText = employee.name;
        row.querySelector('td.salary').innerText = `R$ ${employee.salary.toString().slice(0,-3)?employee.salary.toString().slice(0,-3)+'.':''}${employee.salary.toString().slice(-3)},00`
        row.querySelector('td.role').innerText = roles.filter(role => role.id === employee['role_id']).map(role => role.name)[0];
        return row;
    }).forEach(row => tbody.appendChild(row))
    document.getElementById('total').innerText = this.employees.length;

}

function orderEmployees() {
    return new Promise(
        (resolve) => {
            const orders = [
                (a, b) =>
                (a.name > b.name) ? 1 : -1,
                (a, b) =>
                (a.name > b.name) ? -1 : 1,
                (a, b) =>
                (a.salary > b.salary) ? 1 : -1,
                (a, b) =>
                (a.salary > b.salary) ? -1 : 1

            ]
            const ordem = parseInt(document.getElementById('order').value);
            const filters = [...document.getElementById('filters').getElementsByClassName('role')]
                .filter(el=>el.checked)
                .map(el=>el.name);
            
            if(!filters.length) resolve(this.employees.sort(orders[ordem]));

            resolve(this.employees.sort(orders[ordem]).filter(employee=>filters.includes(employee['role_id'].toString())));
        })
}


async function main() {
    await getRoles();
    renderRoles();
    await getEmployees();
    document.getElementById('total').innerText = this.employees.length;
    renderEmployees();

    document.querySelector('select#order').addEventListener('change',renderEmployees);
    [...document.getElementById('filters').getElementsByClassName('role')].forEach(el=>el.addEventListener('change',renderEmployees))
}