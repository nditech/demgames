import React from 'react';

export const GameInfo = () => (
    <div className="game-info">
        <div className="game-info-bg"></div>
        <div className="game-info-content text-center px-4">
            <h4>¿Cómo jugar?</h4>
            <p>Seleccione un tema.</p>
            <p>Seleccione un nivel.</p>
            <p>Adjunte el término adecuado con su definición correspondiente.</p>
            <p>Disfrute el juego.</p>
            <p className="small">Presione el botón <i className="material-icons">info</i> para cerrar</p>
        </div>
    </div>
);

/** English:
<h4>How to play?</h4>
<p>Select a topic.</p>
<p>Select a level.</p>
<p>Match the right term with the right definition.</p>
<p>Enjoy the game.</p>
<p className="small">Click on Info Button again to close</p>
 */