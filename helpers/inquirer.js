const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1".green}.Crear Tarea`,
      },
      {
        value: "2",
        name: `${"2".green}.Listar Tareas`,
      },
      {
        value: "3",
        name: `${"3".green}.Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4".green}.Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5".green}.Completar Tarea(s)`,
      },
      {
        value: "6",
        name: `${"6".green}.Borrar Tarea`,
      },
      {
        value: "0",
        name: `${"0".green}.Salir\n`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear;
  console.log("==========================".green);
  console.log("Seleccione una opción".rainbow);
  console.log("==========================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"enter".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = {
    type: "input",
    name: "desc",
    message,
    validate(value) {
      if (value.length === 0) {
        return "Por favor ingrese un valor";
      }
      return true;
    },
  };

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasParaBorarr = async (tareas = []) => {
  const choices = tareas.map((t, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: t.id,
      name: `${idx} ${t.desc}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar ",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const listadoChecklist = async (tareas = []) => {
  const choices = tareas.map((t, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: t.id,
      name: `${idx} ${t.desc}`,
      checked: t.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasParaBorarr,
  confirmar,
  listadoChecklist,
};
