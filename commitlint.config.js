module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nueva característica
        'fix',      // Corrección de bug
        'docs',     // Documentación
        'style',    // Estilos, formateo (no afecta lógica)
        'refactor', // Refactorización de código
        'perf',     // Mejoras de rendimiento
        'test',     // Agregar o corregir pruebas
        'chore',    // Tareas de mantenimiento, dependencias
        'ci'        // Configuración de integración continua
      ]
    ],
    'subject-case': [2, 'always', 'sentence-case']
  }
};
