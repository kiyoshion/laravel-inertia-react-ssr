<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'title',
        'body',
        'thumbnail',
        'image',
    ];

    protected $appends = [
        'image_fullpath',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getImageFullpathAttribute()
    {
        return asset('storage/' . $this->image);
    }
}
