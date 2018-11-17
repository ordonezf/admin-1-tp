const appointmentsInfo = {
    "Cardiologia": {
        "Watson Juan": [
            '1995-12-17T03:24:00',
            '1995-12-17T03:24:00'
        ]
    },
    "Deportologia": {
        "Strange Esteban": [
            '1995-12-17T03:24:00',
            '1995-12-17T03:24:00'
        ]
    },
    "Traumatologia": {
        "House Gregorio": [
            '1995-12-17T03:24:00',
            '1995-12-17T03:24:00'
        ]
    },
};

class ServerConnector {
    getAppointmentsInfo() {
        return appointmentsInfo;
    }
}

export default ServerConnector;