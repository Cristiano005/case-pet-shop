<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Animal extends Model
{
    protected $fillable = ['user_id', 'name', 'specie', 'breed', 'sex', 'age', 'weight', 'observations'];

    use HasFactory;

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function appoitments(): HasMany {
        return $this->hasMany(Appointment::class);
    }
}
