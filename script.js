const schedule = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
];

function getNextTrainTime() {
    const now = new Date();
    for (let time of schedule) {
        const [hours, minutes] = time.split(':');
        const trainTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        if (trainTime > now) {
            return trainTime;
        }
    }
    return null;
}

function updateCountdown() {
    const nextTrainTime = getNextTrainTime();
    if (!nextTrainTime) {
        document.getElementById('next-train-time').textContent = "No more trains today";
        document.getElementById('countdown').textContent = "";
        return;
    }
    
    const now = new Date();
    const timeDiff = nextTrainTime - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById('next-train-time').textContent = nextTrainTime.toLocaleTimeString();
    document.getElementById('countdown').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateCountdown, 1000);
