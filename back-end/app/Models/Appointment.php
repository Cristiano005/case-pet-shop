<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $fillable = ['user_id', 'animal_id', 'service_id', 'free_schedule_id', 'status', 'price', 'observations'];

    use HasFactory;

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function animal(): BelongsTo {
        return $this->belongsTo(Animal::class);
    }

    public function service(): BelongsTo {
        return $this->belongsTo(Service::class);
    }
}
