function Walls(health, strength) {
  this.z = undefined;
  Form.call(this, health, strength);
}

Walls.prototype = Object.create(Form.prototype);
Walls.prototype.constructor = Walls;

Walls.prototype.drawWalls = function () {
  const wall_type = ['normal','ice','electric','wash','blackHole','teletransport'];
  function walls(x, y, style, i) {
    return {
      'wall01': {'path': '<g class="form wall ' + style + '" <!--filter="url(#glow)"--> num="' + i + '">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + (y+1) + '" width="1" height="1"/>\
                <g>',
                'positions': [{x, y}, {x: x+1, y}, {x, y: y+1}, {x: x+1, y: y+1}],
                },
      'wall02': {'path': '<g class="form wall ' + style + '" <!--filter="url(#glow)"--> "num="' + i + '">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + (x+1) + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                </g>',
                'positions': [{x, y}, {x: x+1, y}, {x, y: y+1}],
                },
      'wall03': {'path': '<g class="form wall ' + style + '" <!--filter="url(#glow)"--> num="' + i + '">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                </g>',
                'positions': [{x, y}, {x, y: y+1}],
                },
      'wall04': {'path': '<g class="form wall ' + style + '" <!--filter="url(#glow)"--> num="' + i + '">\
                <rect x="' + x + '" y="' + y + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+1) + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+2) + '" width="1" height="1"/>\
                <rect x="' + x + '" y="' + (y+3) + '" width="1" height="1"/>\
                </g>',
                'positions': [{x, y}, {x, y: y+1}, {x, y: y+2}, {x, y: y+3}],
                }
    }
  }
  for (let i = 0; i < walls_limit; i++) {
    let pos = this.getFreePosition(3);
    this.x = pos.x;
    this.y = pos.y;
    this.style = this.randomArr(wall_type);
    let wall = this.randomObj(walls(this.x,this.y,this.style,i));
    this.path = wall.path;
    board.area.append(this.path);
    wall.positions.map((e)=>{
      board.grid[e.y][e.x] = WALL;
    });
  }

}
