import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faClock, faPlayCircle, faComments, faCalendarCheck, faUserCircle} from '@fortawesome/free-regular-svg-icons'
import { faUsers, faPlus, faChair, faBookOpen, faHome, faUserCog, faUsersCog, faFan } from '@fortawesome/free-solid-svg-icons'

export const icon = {
    checkTitle: <FontAwesomeIcon icon={faCheckCircle} size="1x" color="Tomato" />,
    clock: <FontAwesomeIcon icon={faClock} size="1x" color="Tomato" />,
    users: <FontAwesomeIcon icon={faUsers} size="1x" color="Tomato" />,
    play: <FontAwesomeIcon icon={faPlayCircle} size="1x" color="Tomato" />,
    add: <FontAwesomeIcon icon={faPlus} size="1x" color="Tomato" />,
    seat: <FontAwesomeIcon icon={faChair} size="1x" color="Tomato" />,
    book: <FontAwesomeIcon icon={faBookOpen} size="1x" color="Tomato" />,
    comments: <FontAwesomeIcon icon={faComments} size="1x" color="Tomato" />,
    calendar: <FontAwesomeIcon icon={faCalendarCheck} size="1x" color="Tomato" />,
    home: <FontAwesomeIcon icon={faHome} size="1x" color="Tomato" />,
    userCog: <FontAwesomeIcon icon={faUserCog} size="1x" color="Tomato" />,
    usersCog: <FontAwesomeIcon icon={faUsersCog} size="1x" color="Tomato" />,
    profile: <FontAwesomeIcon icon={faUserCircle} size="1x" color="Tomato" />,
    fan: <FontAwesomeIcon icon={faFan} size="1x" color="Tomato" />
}

export const icons2x = {
    fan: <FontAwesomeIcon icon={faFan} size="2x" color="Tomato" />
}
