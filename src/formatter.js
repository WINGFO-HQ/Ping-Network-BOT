const eventTypeDisplayMap = {
    'ATTEMPT_CONNECT': 'Connecting',
    'CONNECTION_OPEN': 'Connected',
    'DATA_RECEIVED': 'Data Received',
    'RAW_DATA_RECEIVED': 'Raw Data (Invalid JSON)',
    'CONNECTION_ERROR': 'Connection Error',
    'CONNECTION_CLOSED': 'Disconnected',
    'INITIALIZING': 'Initializing'
};

function formatTimestamp(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatEventType(typeString) {
    if (!typeString || typeof typeString !== 'string') return 'Unknown Event';
    
    if (eventTypeDisplayMap[typeString]) {
        return eventTypeDisplayMap[typeString];
    }

    return typeString
        .replace(/_/g, ' ')
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

module.exports = {
    formatTimestamp,
    formatEventType
};