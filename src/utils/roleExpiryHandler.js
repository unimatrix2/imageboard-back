export const roleToDateHandler = role => {
    switch (role) {
        case 'anon':
            return Date.now() + 604800000;
        case 'user':
            return Date.now() + 2629800000;
        case 'modmin':
            return Date.now() + 15778800000;
        case 'admin':
            return Date.now() + 31557600000;
    };
};