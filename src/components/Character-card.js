const CharacterCard = ({ character }) => {
    const getStatusIconColor = status => {
        switch (status) {
            case 'Alive':
                return 'status__icon_green';
            case 'Dead':
                return 'status__icon_red';
            case 'unknown':
                return 'status__icon_orange';
            default:
                return ''
        }
    };
    return (
        <article className='characterCard'>
            <div className="characterCard__avatar">
                <img src={character.image || ''} alt={character.name || ''}/>
            </div>
            <div className="characterCard__info">
                <div className='infoSection'>
                    <h2>{character.name || ''}</h2>
                    <span className='status'>
                        <span className={`status__icon ${getStatusIconColor(character.status)}`} />
                        {character.status || ''} - {character.species || ''}
                    </span>
                </div>
                <div className='infoSection'>
                    <span className='infoSection__textGray'>Last known location:</span>
                    <span>{character.location.name || ''}</span>
                </div>
                <div className='infoSection'>
                    <span className='infoSection__textGray'>First seen in:</span>
                    <span>{character.firstSeen}</span>
                </div>
            </div>
        </article>
    )
};

export default CharacterCard;
