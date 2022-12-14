<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Inertia\Inertia;
use App\Models\Item;
use Auth;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Item/Index', [
            'items' => Item::orderByDesc('created_at')->get(),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Item/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = new Item;
        $item->id = uniqid();
        $item->title = $request->title;
        $item->body = $request->body;
        $item->user_id = Auth::id();
        $item->save();

        if ($request->image) {
            $file_name = 'images/items/' . uniqid() . '.jpg';
            $image = \Image::make($request->file('image')->getRealPath())
                ->resize(1200, 600, function($constraint) {
                    $constraint->aspectRatio();
                });
            Storage::disk('public')->put($file_name, (string) $image->encode('jpg', 80));
            $item->image = $file_name;

            $thumbnail = \Image::make($request->file('image')->getRealPath())->resize(null, 160, function($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $bin = base64_encode($thumbnail->encode('jpeg'));

            $item->thumbnail = $bin;
            $item->save();
        }

        return redirect()->route('items.show', [
            'item' => Item::findOrFail($item->id),
            'status' => session('status'),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Inertia::render('Item/Show', [
            'item' => Item::findOrFail($id),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Inertia::render('Item/Edit', [
            'item' => Item::findOrFail($id),
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = Item::updateOrCreate(
            ['id' => $id, 'user_id' => Auth::id()],
            ['title' => $request->title, 'body' => $request->body]
        );

        if ($request->image) {
            if ($item->image && Storage::disk('public')->exists($item->image)) {
                Storage::disk('public')->delete($item->image);
            }
            $file_name = 'images/items/' . uniqid() . '.jpg';
            $image = \Image::make($request->file('image')->getRealPath())
                ->resize(1200, 630, function($constraint) {
                    $constraint->aspectRatio();
                });
            Storage::disk('public')->put($file_name, (string) $image->encode('jpg', 80));
            $item->image = $file_name;
            $item->update();
        }

        return redirect()->route('items.show', [
            'item' => Item::findOrFail($id),
            'status' => session('status'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Item::findOrFail($id);

        if ($item->image && Storage::disk('public')->exists($item->image)) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return redirect()->route('items.index', [
            'items' => Item::orderByDesc('created_at')->get(),
            'status' => session('status'),
        ]);
    }
}
