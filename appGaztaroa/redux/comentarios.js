import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.ADD_COMENTARIO:
      const nuevoId = state.comentarios.length
        ? Math.max(...state.comentarios.map((comentario) => comentario.id)) + 1
        : 0;
      const comentario = {...action.payload, id: nuevoId};

      return {...state, comentarios: state.comentarios.concat(comentario)};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};
