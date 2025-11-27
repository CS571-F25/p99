import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const tourEndDate = new Date('December 31, 2025 23:59:59').getTime(); // change
      const now = new Date().getTime();
      const difference = tourEndDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card style={{ 
      backgroundColor: '#1a1a1a', 
      border: '3px solid #8b5cf6', 
      color: '#ffffff',
      padding: '20px',
      textAlign: 'center'
    }}>
      <Card.Body>
        <h3 style={{ color: '#8b5cf6', marginBottom: '15px' }}>TOUR FINALE COUNTDOWN</h3>
        <p style={{ color: '#a78bfa', marginBottom: '20px' }}>Las Vegas, NV • December 31, 2025</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div style={{ margin: '10px' }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: '#8b5cf6',
              textShadow: '0 0 20px #8b5cf6'
            }}>
              {timeLeft.days}
            </div>
            <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>DAYS</div>
          </div>
          
          <div style={{ margin: '10px' }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: '#8b5cf6',
              textShadow: '0 0 20px #8b5cf6'
            }}>
              {timeLeft.hours}
            </div>
            <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>HOURS</div>
          </div>
          
          <div style={{ margin: '10px' }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: '#8b5cf6',
              textShadow: '0 0 20px #8b5cf6'
            }}>
              {timeLeft.minutes}
            </div>
            <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>MINUTES</div>
          </div>
          
          <div style={{ margin: '10px' }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: '#8b5cf6',
              textShadow: '0 0 20px #8b5cf6'
            }}>
              {timeLeft.seconds}
            </div>
            <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>SECONDS</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Countdown;

