
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, RotateCcw } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Obstacle extends GameObject {
  type: 'brick' | 'stone';
}

interface Coin extends GameObject {
  collected: boolean;
}

const WYNRunnerGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | undefined>();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [wynKoins, setWynKoins] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('wynRunnerHighScore') || '0');
  });

  // Game objects
  const [dog, setDog] = useState<GameObject>({ x: 50, y: 200, width: 40, height: 30 });
  const [ball, setBall] = useState<GameObject>({ x: 150, y: 180, width: 20, height: 20 });
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [gameSpeed, setGameSpeed] = useState(2);

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 600;

  // Initialize game
  const initGame = useCallback(() => {
    setDog({ x: 50, y: 200, width: 40, height: 30 });
    setBall({ x: 150, y: 180, width: 20, height: 20 });
    setObstacles([]);
    setCoins([]);
    setScore(0);
    setGameSpeed(2);
  }, []);

  // Check collision
  const checkCollision = (obj1: GameObject, obj2: GameObject) => {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  };

  // Handle touch controls
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (gameState !== 'playing') return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;

    setDog(prev => {
      let newX = prev.x;
      let newY = prev.y;

      // Horizontal movement
      if (touchX > centerX) {
        newX = Math.min(CANVAS_WIDTH - prev.width, prev.x + 15);
      } else {
        newX = Math.max(0, prev.x - 15);
      }

      // Vertical movement
      if (touchY < centerY) {
        newY = Math.max(0, prev.y - 15);
      } else {
        newY = Math.min(CANVAS_HEIGHT - prev.height, prev.y + 15);
      }

      return { ...prev, x: newX, y: newY };
    });
  }, [gameState]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    // Move ball forward
    setBall(prev => ({
      ...prev,
      x: prev.x + gameSpeed,
      y: prev.y + (Math.sin(Date.now() * 0.005) * 2) // Bouncing effect
    }));

    // Generate obstacles
    setObstacles(prev => {
      let newObstacles = [...prev];
      
      if (Math.random() < 0.02 + score * 0.0001) {
        const type = Math.random() < 0.5 ? 'brick' : 'stone';
        newObstacles.push({
          x: CANVAS_WIDTH,
          y: Math.random() * (CANVAS_HEIGHT - 100),
          width: type === 'brick' ? 30 : 25,
          height: type === 'brick' ? 20 : 25,
          type
        });
      }

      // Move obstacles
      return newObstacles
        .map(obs => ({ ...obs, x: obs.x - gameSpeed }))
        .filter(obs => obs.x > -obs.width);
    });

    // Generate coins
    setCoins(prev => {
      let newCoins = [...prev];
      
      if (Math.random() < 0.01) {
        newCoins.push({
          x: CANVAS_WIDTH,
          y: Math.random() * (CANVAS_HEIGHT - 100),
          width: 15,
          height: 15,
          collected: false
        });
      }

      // Move coins
      return newCoins
        .map(coin => ({ ...coin, x: coin.x - gameSpeed }))
        .filter(coin => coin.x > -coin.width);
    });

    // Check collisions with obstacles
    obstacles.forEach(obstacle => {
      if (checkCollision(dog, obstacle)) {
        setGameState('gameOver');
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('wynRunnerHighScore', score.toString());
        }
      }
    });

    // Check coin collection
    setCoins(prev => 
      prev.map(coin => {
        if (!coin.collected && checkCollision(dog, coin)) {
          setWynKoins(k => k + 1);
          return { ...coin, collected: true };
        }
        return coin;
      }).filter(coin => !coin.collected)
    );

    // Update score and speed
    setScore(prev => prev + 1);
    setGameSpeed(prev => Math.min(prev + 0.001, 5));

  }, [gameState, dog, obstacles, gameSpeed, score, highScore]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, 16); // ~60 FPS
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw street
    ctx.fillStyle = '#666';
    ctx.fillRect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50);
    
    // Draw street lines
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT - 25);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 25);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw ball
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(ball.x + ball.width/2, ball.y + ball.height/2, ball.width/2, 0, Math.PI * 2);
    ctx.fill();

    // Draw dog
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(dog.x, dog.y, dog.width, dog.height);
    
    // Dog ears
    ctx.fillStyle = '#654321';
    ctx.fillRect(dog.x + 5, dog.y - 5, 8, 10);
    ctx.fillRect(dog.x + 27, dog.y - 5, 8, 10);
    
    // Dog eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(dog.x + 10, dog.y + 5, 3, 3);
    ctx.fillRect(dog.x + 27, dog.y + 5, 3, 3);

    // Draw obstacles
    obstacles.forEach(obstacle => {
      if (obstacle.type === 'brick') {
        ctx.fillStyle = '#B22222';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Brick pattern
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 1;
        for (let i = 0; i < obstacle.height; i += 5) {
          ctx.beginPath();
          ctx.moveTo(obstacle.x, obstacle.y + i);
          ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + i);
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#696969';
        ctx.beginPath();
        ctx.arc(
          obstacle.x + obstacle.width/2, 
          obstacle.y + obstacle.height/2, 
          obstacle.width/2, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
      }
    });

    // Draw coins
    coins.forEach(coin => {
      if (!coin.collected) {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2, coin.width/2, 0, Math.PI * 2);
        ctx.fill();
        
        // WYN text
        ctx.fillStyle = '#B8860B';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('W', coin.x + coin.width/2, coin.y + coin.height/2 + 2);
      }
    });
  }, [dog, ball, obstacles, coins, gameState]);

  const startGame = () => {
    initGame();
    setGameState('playing');
  };

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused');
  };

  const resetGame = () => {
    initGame();
    setGameState('menu');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-green-400 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold gradient-text mb-2">🐕 WYN Runner</h2>
          <div className="flex justify-between text-sm">
            <span>Score: {score}</span>
            <span>WYN-Koins: 💰 {wynKoins}</span>
            <span>Best: {highScore}</span>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-gray-300 rounded-lg w-full"
          style={{ touchAction: 'none' }}
          onTouchStart={handleTouchStart}
        />

        <div className="flex justify-center gap-2 mt-4">
          {gameState === 'menu' && (
            <Button onClick={startGame} className="bg-wynGreen-500 hover:bg-wynGreen-600">
              <Play className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          )}
          
          {(gameState === 'playing' || gameState === 'paused') && (
            <>
              <Button onClick={pauseGame} variant="outline">
                {gameState === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
              <Button onClick={resetGame} variant="outline">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {gameState === 'gameOver' && (
            <div className="text-center">
              <p className="text-lg font-bold text-red-600 mb-2">Game Over!</p>
              <p className="text-sm mb-4">You earned {wynKoins} WYN-Koins!</p>
              <Button onClick={startGame} className="bg-wynGreen-500 hover:bg-wynGreen-600">
                Play Again
              </Button>
            </div>
          )}
        </div>

        {gameState === 'playing' && (
          <div className="mt-4 text-xs text-gray-600 text-center">
            <p>Tap screen to move the dog!</p>
            <p>Left/Right: Move horizontally</p>
            <p>Up/Down: Move vertically</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WYNRunnerGame;
